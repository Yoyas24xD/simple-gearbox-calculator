export type StorageEventType = "save" | "remove" | "clear";

export type StorageChangeHandler<T> = (
  key: string,
  value: T | null,
  event: StorageEventType
) => void;

export interface StorageStrategy<T = unknown> {
  save(key: string, value: T): Promise<void>;
  load(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  addChangeListener(handler: StorageChangeHandler<T>): () => void;
}
