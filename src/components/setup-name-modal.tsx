import { createPortal } from "react-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, type FC } from "react";
import { useSetups } from "../hooks/use-setups";

export const SetupNameModal: FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}> = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const setups = useSetups();
  const isNameTaken = setups
    .map((setup) => setup.toLowerCase())
    .includes(name.toLowerCase());

  if (!open) return null;

  return createPortal(
    <article className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm w-1/3 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4">
          Setup Name
        </h2>
        <Input
          placeholder="Enter setup name"
          onChange={(e) => setName(e.target.value)}
        />
        {isNameTaken && (
          <p className="text-red-500 mt-2 wrap-break-word">
            A setup with this name already exists. Please choose a different
            name.
          </p>
        )}
        <div className="mt-4">
          <Button flavor="ghost" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            disabled={!name || isNameTaken}
            flavor="primary"
            onClick={() => onConfirm(name)}
            className="mt-4"
          >
            Create Setup
          </Button>
        </div>
      </div>
    </article>,
    document.body,
  );
};
