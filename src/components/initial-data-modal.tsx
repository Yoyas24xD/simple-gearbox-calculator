import { useState } from "react";
import { createPortal } from "react-dom";
import { useCarSetup } from "../hooks/use-car-setup";
import { useSetups } from "../hooks/use-setups";
import { Autocomplete } from "./ui/autocomplete";
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

export const InitialDataModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [csv, setCsv] = useState<string>("");
  const { setup, setSetup, loadSetup } = useCarSetup();
  const setups = useSetups();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <section className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Enter RPM + Torque Data
        </h3>
        <p className="text-gray-600 mb-6">
          Paste your CSV data (RPM;Torque per line) or load an existing setup.
        </p>
        <textarea
          className="w-full h-64 border border-gray-300 text-gray-800 p-3 rounded-lg outline-none focus:border-blue-500 focus:ring-blue-500 resize-y mb-4"
          rows={10}
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="e.g., 1000;50&#10;2000;80&#10;3000;120"
        />
        <div className="flex flex-col sm:flex-row gap-4 py-2 items-center justify-center">
          <Button
            flavor="primary"
            onClick={() => {
              const parsedData = parseCsv(csv);
              setSetup({
                type: "UPDATE_TORQUE_LINE",
                data: parsedData,
              });
              setCsv("");
              setIsOpen(false);
            }}
            disabled={!csv.trim()}
            className="w-full sm:w-auto flex-shrink-0"
          >
            Load CSV
          </Button>
          <div className="w-full sm:w-auto flex-grow">
            <Autocomplete
              disabled={setups.length === 0}
              key={setups.length}
              value={setup.name !== "New Setup" ? setup.name : ""}
              placeholder="Or select an existing setup"
              items={
                setups.map((name) => ({
                  label: name,
                  value: name,
                })) ?? []
              }
              onChange={(value) => {
                setSetup({
                  type: "UPDATE_SETUP_NAME",
                  name: value,
                });
              }}
              onSelect={(item) => {
                if (!item) return;
                loadSetup(item.value);
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};
