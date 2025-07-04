import type { FC } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Divider } from "./ui/divider";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AppConfig: FC<Props> = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return createPortal(
    <section className="absolute top-1/2 left-1/2 w-1/2 p-4 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-lg z-50 bg-gray-800">
      <h1 className="text-center">App Configuration</h1>
      <Divider />
      <p>This section is for configuring application settings.</p>
      {/* Add your configuration components here */}
      <p>More configuration options will be added soon.</p>
      <Button flavor="danger" onClick={onClose}>
        Close
      </Button>
    </section>,
    document.body
  );
};
