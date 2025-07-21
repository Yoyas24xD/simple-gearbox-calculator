import type { FC } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

interface Props {
  title: string;
  message?: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
export const ConfirmModal: FC<Props> = ({
  title,
  message = "Are you sure you want to proceed?",
  open,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center shadow-lg bg-black/50">
      <div className="bg-indigo-950 p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} flavor="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} flavor="danger">
            Confirm
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
