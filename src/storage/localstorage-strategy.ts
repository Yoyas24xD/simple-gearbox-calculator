import type { StorageStrategy } from "./strategy";

export class LocalStorageStrategy implements StorageStrategy {
  async save(key: string, value: unknown): Promise<void> {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  }

  async load(key: string): Promise<unknown | null> {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
