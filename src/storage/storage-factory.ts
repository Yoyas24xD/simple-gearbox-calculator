import { IndexedDBStrategy } from "./indexdb-strategy";
import { LocalStorageStrategy } from "./localstorage-strategy";
import type { StorageStrategy } from "./strategy";

export type StorageType = "local" | "session" | "indexeddb" | "cookies";

export class StorageFactory {
  private static readonly instances: Map<StorageType, StorageStrategy> =
    new Map();

  static getStorage<T>(type: StorageType = "local"): StorageStrategy<T> {
    if (!this.instances.has(type)) {
      let instance: StorageStrategy<T>;

      switch (type) {
        case "local":
          instance = new LocalStorageStrategy<T>();
          break;
        case "session":
          throw new Error("Session storage is not implemented yet.");
        case "indexeddb":
          instance = new IndexedDBStrategy<T>();
          break;
        case "cookies":
          throw new Error("Cookies storage is not implemented yet.");
        default:
          throw new Error(`Unsupported storage type: ${type}`);
      }

      this.instances.set(type, instance);
    }

    return this.instances.get(type)! as StorageStrategy<T>;
  }
}
