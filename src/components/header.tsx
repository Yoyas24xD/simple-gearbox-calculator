import Gear from "../assets/gear.svg";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GlobalConfig } from "./global-config";
import { Autocomplete } from "./ui/autocomplete";
import { useIndexedDB } from "../hooks/use-storage";
import { useCarSetup, type CarSetup } from "../hooks/use-car-setup";

export const Header = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { setup, setSetup, persistSetup, loadSetup } = useCarSetup();
  const storage = useIndexedDB<CarSetup>(setup.name);
  const [setups, setSetups] = useState<string[]>([]);

  useEffect(() => {
    const fetchSetups = async () => {
      const keys = await storage.keys();
      setSetups(keys);
    };
    fetchSetups();
  }, []);

  return (
    <>
      <GlobalConfig open={openConfig} onClose={() => setOpenConfig(false)} />
      <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-800 shadow-lg rounded-b-lg">
        <div className="mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto">
          <Autocomplete
            value={setup.name}
            items={
              setups.map((name) => ({
                label: name,
                value: name,
              })) ?? []
            }
            listId="setup"
            onSelect={(item) => {
              if (!item) return;
              loadSetup(item.value);
            }}
            onChange={(value) => {
              console.log(value);
              setSetup({
                type: "UPDATE_SETUP_NAME",
                name: value,
              });
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            flavor="primary"
            onClick={persistSetup}
            className="ml-0 sm:ml-2"
          >
            Save Setup
          </Button>

          <Button
            flavor="danger"
            onClick={() => console.log("TODO: Delete setup")}
          >
            Delete Setup
          </Button>

          <Button onClick={() => setOpenConfig(true)}>
            <img src={Gear} className="w-6 h-6" alt="config" />
          </Button>
        </div>
      </header>
    </>
  );
};
