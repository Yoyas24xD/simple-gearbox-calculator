import { Cog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";
import { ConfirmModal } from "./confirm-modal";
import { GlobalConfig } from "./global-config";
import { Autocomplete } from "./ui/autocomplete";
import { Button } from "./ui/button";

export const Header = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { setup, setSetup, persistSetup, loadSetup, deleteSetup } =
    useCarSetup();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const setups = useSetups();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-xl border border-gray-200 mb-8">
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
      <div className="mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/3 md:w-1/4">
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
            setSetup({
              type: "UPDATE_SETUP_NAME",
              name: value,
            });
          }}
        />
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
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
        <Button onClick={() => setOpenConfig(true)} className="p-2">
          <Cog className="w-6 h-6 text-white" />
        </Button>
      </div>
    </header>
  );
};
