import type {
  StorageChangeHandler,
  StorageEventType,
  StorageStrategy,
} from "./strategy";

export class IndexedDBStrategy<T = unknown> implements StorageStrategy<T> {
  private readonly dbName = "browserStorageDB";
  private readonly storeName = "keyValueStore";
  private readonly listeners: Set<StorageChangeHandler<T>> = new Set();
  private db: IDBDatabase | null = null;

  constructor() {
    this.initializeDB();
  }
  async keys(): Promise<string[]> {
    await this.initializeDB();
    const store = this.getObjectStore("readonly");
    const request = store.getAllKeys();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result.map(String));
      request.onerror = () => reject(request.error);
    });
  }

  private initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private getObjectStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  async save(key: string, value: T): Promise<void> {
    await this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      const request = store.put(value, key);

      request.onsuccess = () => {
        this.notifyListeners(key, value, "save");
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async load(key: string): Promise<T | null> {
    await this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readonly");
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async remove(key: string): Promise<void> {
    await this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      const request = store.delete(key);

      request.onsuccess = () => {
        this.notifyListeners(key, null, "remove");
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clear(): Promise<void> {
    await this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      const request = store.clear();

      request.onsuccess = () => {
        this.notifyListeners("", null, "clear");
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  addChangeListener(handler: StorageChangeHandler<T>): () => void {
    this.listeners.add(handler);
    return () => this.listeners.delete(handler);
  }

  private notifyListeners(
    key: string,
    value: T | null,
    event: StorageEventType,
  ): void {
    this.listeners.forEach((handler) => handler(key, value, event));
  }
}
