import { Cog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";
import { ConfirmModal } from "./confirm-modal";
import { GlobalConfig } from "./global-config";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "wouter";

export const Header = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { setup, setSetup, persistSetup } = useCarSetup();
  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const setups = useSetups();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-xl border border-gray-200 mb-8">
      <nav className="flex space-x-4 mb-4 sm:mb-0">
        <Link to="/suspension">Suspension</Link>
        <Link to="/gears">Gears</Link>
      </nav>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <Input
          value={setup.name}
          onChange={(e) => {
            setSetup({
              type: "UPDATE_SETUP_NAME",
              name: e.target.value,
            });
          }}
          className="flex-1"
        />
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
        <Button onClick={() => setOpenConfig(true)} className="p-2">
          <Cog className="w-6 h-6 text-white" />
        </Button>
      </div>
      <ConfirmModal
        title="Overwrite Setup"
        message={`Are you sure you want to overwrite the current setup "${setup.name}"? This action cannot be undone.`}
        open={overwriteOpen}
        onCancel={() => setOverwriteOpen(false)}
        onConfirm={persistSetup}
      />
      <GlobalConfig open={openConfig} onClose={() => setOpenConfig(false)} />
    </header>
  );
};
