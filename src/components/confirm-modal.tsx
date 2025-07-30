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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button flavor="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button flavor="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
