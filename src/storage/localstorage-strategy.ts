import type {
  StorageChangeHandler,
  StorageEventType,
  StorageStrategy,
} from "./strategy";

export class LocalStorageStrategy<T = unknown>
  implements StorageStrategy<T>
{
  private readonly listeners: Set<StorageChangeHandler<T>> = new Set();

  async save(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    this.notifyListeners(key, value, "save");
  }

  async load(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
    this.notifyListeners(key, null, "remove");
  }

  async clear(): Promise<void> {
    localStorage.clear();
    this.notifyListeners("", null, "clear");
  }

  addChangeListener(handler: StorageChangeHandler<T>): () => void {
    this.listeners.add(handler);
    return () => this.listeners.delete(handler);
  }

  private notifyListeners(
    key: string,
    value: T | null,
    event: StorageEventType
  ): void {
    this.listeners.forEach((handler) => handler(key, value, event));
  }
}
