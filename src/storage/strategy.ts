export type StorageEventType = "save" | "load" | "remove" | "clear";

export type StorageChangeHandler<T> = (
  key: string,
  value: T | null,
  event: StorageEventType
) => void;

export interface StorageStrategy<T = unknown> {
  save(key: string, value: T): void;
  load(key: string): T | null;
  remove(key: string): void;
  clear(): void;
  // addChangeListener(handler: StorageChangeHandler<T>): () => void;
}
