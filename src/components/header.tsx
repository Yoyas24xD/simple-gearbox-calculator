import { useEffect, useState } from "react";
import { toast } from "sonner";
import Gear from "../assets/gear.svg";
import { useCarSetup, type CarSetup } from "../hooks/use-car-setup";
import { useIndexedDB } from "../hooks/use-storage";
import { ConfirmModal } from "./confirm-modal";
import { GlobalConfig } from "./global-config";
import { Autocomplete } from "./ui/autocomplete";
import { Button } from "./ui/button";

export const Header = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { setup, setSetup, persistSetup, loadSetup, deleteSetup } =
    useCarSetup();
  const storage = useIndexedDB<CarSetup>(setup.name);
  const [setups, setSetups] = useState<string[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [overwriteOpen, setOverwriteOpen] = useState(false);

  useEffect(() => {
    const fetchSetups = async () => {
      const keys = await storage.keys();
      setSetups(keys);
    };
    fetchSetups();
  }, []);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-800 shadow-lg rounded-b-lg">
      <ConfirmModal
        title="Delete Setup"
        message={`Are you sure you want to delete the setup "${setup.name}"? This action cannot be undone.`}
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => deleteSetup(setup.name)}
      />
      <ConfirmModal
        title="Overwrite Setup"
        message={`Are you sure you want to overwrite the current setup "${setup.name}"? This action cannot be undone.`}
        open={overwriteOpen}
        onCancel={() => setOverwriteOpen(false)}
        onConfirm={persistSetup}
      />
      <GlobalConfig open={openConfig} onClose={() => setOpenConfig(false)} />
      <div className="mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto">
        <Autocomplete
          key={setups.length}
          value={setup.name}
          items={
            setups.map((name) => ({
              label: name,
              value: name,
            })) ?? []
          }
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
          onClick={() => {
            if (setup.name === "New Setup") {
              toast.error("Please enter a setup name before saving.");
              return;
            }
            if (setups.includes(setup.name)) {
              setOverwriteOpen(true);
              return;
            }
            persistSetup();
          }}
          className="ml-0 sm:ml-2"
        >
          Save Setup
        </Button>

        <Button
          flavor="danger"
          disabled={setup.name === "New Setup"}
          onClick={() => setDeleteOpen(true)}
        >
          Delete Setup
        </Button>

        <Button onClick={() => setOpenConfig(true)}>
          <img src={Gear} className="w-6 h-6" alt="config" />
        </Button>
      </div>
    </header>
  );
};
