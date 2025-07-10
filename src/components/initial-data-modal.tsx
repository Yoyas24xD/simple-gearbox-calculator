import { useState } from "react";
import { createPortal } from "react-dom";
import { useInitialData } from "../hooks/use-initial-data";
import { toast } from "sonner";
import { Button } from "./ui/button";

const parseCsv = (csv: string): { rpm: number; torque: number }[] => {
  return csv
    .trim()
    .split("\n")
    .map((line) => {
      const [rpm, torque] = line
        .split(";")
        .map((n) => Number(n.replace(",", ".")));
      return { rpm, torque };
    });
};

export const InitialDataModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [csv, setCsv] = useState<string>("");
  const { setData } = useInitialData();

  if (!isOpen) return null;

  return createPortal(
    <section className="absolute top-1/2 left-1/2 -translate-1/2 rounded-sm shadow bg-zinc-800 px-4 py-2 w-1/2">
      <h3>Enter the extracted RPM + torque</h3>
      <textarea
        className="w-full h-full border border-zinc-600 text-white p-2 rounded outline-none"
        rows={10}
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
      />
      <div className="flex gap-4 py-2">
        <Button
          onClick={() => {
            const parsedData = parseCsv(csv);
            setData(parsedData);
            setCsv("");
            setIsOpen(false);
            toast.success("Data loaded successfully!");
          }}
        >
          Load Csv
        </Button>
        <Button
          flavor="secondary"
          onClick={() => {
            console.log("prueba");
          }}
        >
          Load setup
        </Button>
      </div>
    </section>,
    document.body
  );
};
