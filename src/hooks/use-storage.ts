import { useCallback, useEffect, useMemo, useState } from "react";
import { StorageFactory, type StorageType } from "../storage/storage-factory";
import type {
  StorageChangeHandler,
  StorageStrategy,
} from "../storage/strategy";

const useBrowserStorage = <T = unknown>(
  key: string,
  type: StorageType = "local"
) => {
  const [value, setValue] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const storage: StorageStrategy<T> = useMemo(() => {
    return StorageFactory.getStorage<T>(type);
  }, [type]);

  useEffect(() => {
    const loadInitialValue = async () => {
      try {
        setIsLoading(true);
        const storedValue = await storage.load(key);
        setValue(storedValue);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setValue(null);
      }
      setIsLoading(false);
    };

    loadInitialValue();
  }, [key, storage]);

  useEffect(() => {
    const handler: StorageChangeHandler<T> = (changedKey, newValue) => {
      if (changedKey === key) {
        setValue(newValue);
      }
    };

    const unsubscribe = storage.addChangeListener(handler);
    return unsubscribe;
  }, [key, storage]);

  const save = useCallback(
    async (newValue: T) => {
      try {
        setIsLoading(true);
        await storage.save(key, newValue);
        setValue(newValue);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
      }
    },
    [key, storage]
  );

  const remove = useCallback(async () => {
    try {
      setIsLoading(true);
      await storage.remove(key);
      setValue(null);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  }, [key, storage]);

  const clear = useCallback(async () => {
    try {
      setIsLoading(true);
      await storage.clear();
      setValue(null);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
    setIsLoading(false);
  }, [storage]);

  return {
    value,
    isLoading,
    error,
    save,
    remove,
    clear,
    hasValue: value !== null,
  };
};

export const useLocalStorage = <T = unknown>(key: string) => {
  return useBrowserStorage<T>(key, "local");
};

export const useSessionStorage = <T = unknown>(key: string) => {
  return useBrowserStorage<T>(key, "session");
};

export const useIndexedDB = <T = unknown>(key: string) => {
  return useBrowserStorage<T>(key, "indexeddb");
};

export const useCookies = <T = string>(key: string) => {
  return useBrowserStorage<T>(key, "cookies");
};
