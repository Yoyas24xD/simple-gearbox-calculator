import { X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { createPortal } from "react-dom";
import { useCarSetup } from "../hooks/use-car-setup";
import { Button } from "./ui/button";

const parseCsv = (csv: string): { rpm: number; torque: number }[] => {
  return csv
    .trim()
    .split("\n")
    .map((line) => {
      const [rpm, torque] = line
        .split(";")
        .map((n) => Number(n.replace(",", ".")));
      return { rpm: rpm > 100 ? rpm : rpm * 1000, torque };
    });
};

export const UpdateTorqueModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [csv, setCsv] = useState<string>("");
  const { setSetup } = useCarSetup();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <section className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-center relative">
        <Button
          flavor="ghost"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Enter RPM + Torque Data
        </h3>
        <p className="text-gray-600 mb-6">
          Paste your CSV data (RPM;Torque per line).
        </p>
        <textarea
          className="w-full h-64 border border-gray-300 text-gray-800 p-3 rounded-lg outline-none focus:border-blue-500 focus:ring-blue-500 resize-y mb-4"
          rows={10}
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder={`e.g.\n1000;200\n2000;250\n...`}
        />
        <Button
          flavor="primary"
          onClick={() => {
            const parsedData = parseCsv(csv);
            setSetup({
              type: "UPDATE_TORQUE_LINE",
              data: parsedData,
            });
            setCsv("");
            onClose();
          }}
          disabled={!csv.trim()}
          className="w-full sm:w-auto flex-shrink-0"
        >
          Load CSV
        </Button>
      </section>
    </div>,
    document.body,
  );
};
