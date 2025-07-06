import type { StorageStrategy } from "./strategy";

export class IndexedDBStrategy<T> implements StorageStrategy<T> {
  private readonly dbName = "browserStorageDB";
  private readonly storeName = "keyValueStore";
  private db: IDBDatabase | null = null;

  constructor() {
    this.initializeDB();
  }

  private initializeDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName);
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event) => {
      console.error(
        "IndexedDB initialization failed:",
        (event.target as IDBOpenDBRequest).error
      );
      throw new Error("Failed to initialize IndexedDB");
    };
  }

  private getObjectStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  save(key: string, value: T): void {
    this.initializeDB();
    const store = this.getObjectStore("readwrite");
    const request = store.put(value, key);

    request.onsuccess = () => {
      console.log(`Value saved with key: ${key}`);
    };

    request.onerror = () => {
      console.error(`Failed to save value with key: ${key}`, request.error);
      throw request.error;
    };
  }

  load(key: string): T | null {
    this.initializeDB();
    const store = this.getObjectStore("readonly");
    const request = store.get(key);

    request.onsuccess = () => {
      if (request.result === undefined) {
        console.warn(`No value found for key: ${key}`);
        return null;
      }
      return request.result as T;
    };

    request.onerror = () => {
      console.error(`Failed to load value with key: ${key}`, request.error);
      throw request.error;
    };
    return null; // Return null immediately, actual value will be handled in onsuccess
  }

  async remove(key: string): Promise<void> {
    this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async clear(): Promise<void> {
    this.initializeDB();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore("readwrite");
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }
}
