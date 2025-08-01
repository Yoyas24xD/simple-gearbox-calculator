import { Cog, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";
import { ConfirmModal } from "./confirm-modal";
import { GlobalConfig } from "./global-config";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Header = () => {
  const [location, navigate] = useLocation();
  const [openConfig, setOpenConfig] = useState(false);
  const { isModified, setup, setSetup, persistSetup } = useCarSetup();
  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const setups = useSetups();

  if (!setup.torqueLine.length) {
    navigate("/");
  }

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-lg rounded-xl border border-gray-200 mb-8">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent capitalize">
          {location.slice(1)} Tuner
        </h1>
      </div>
      <nav className="flex space-x-4 mb-4 sm:mb-0">
        <nav className="flex space-x-4">
          <button
            type="button"
            className="text-orange-600 hover:text-orange-500 font-medium transition-colors cursor-pointer"
            onClick={() => {
              if (isModified) {
                setExitOpen(true);
                return;
              }
              navigate("/");
            }}
          >
            Home
          </button>
          <Link to="/suspension">Suspension</Link>
          <Link to="/gearbox">Gearbox</Link>
        </nav>
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
      <ConfirmModal
        title="Exit Without Saving"
        message={`Are you sure you want to exit without saving the current setup "${setup.name}"? This action cannot be undone.`}
        open={exitOpen}
        onCancel={() => setExitOpen(false)}
        onConfirm={() => {
          setExitOpen(false);
          navigate("/");
        }}
      />
      <GlobalConfig open={openConfig} onClose={() => setOpenConfig(false)} />
    </header>
  );
};
