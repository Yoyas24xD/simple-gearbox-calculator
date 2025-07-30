import { useEffect, useState } from "react";
import { StorageFactory } from "../storage/storage-factory";
import type { CarSetup } from "./use-car-setup";

export const useSetups = () => {
  const [setups, setSetups] = useState<string[]>([]);
  const storage = StorageFactory.getStorage<CarSetup>("indexeddb");

  useEffect(() => {
    const fetchSetups = async () => setSetups(await storage.keys());

    fetchSetups();
  }, [storage]);

  return setups;
};
