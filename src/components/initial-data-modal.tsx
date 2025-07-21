import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCarSetup, type CarSetup } from "../hooks/use-car-setup";
import { useIndexedDB } from "../hooks/use-storage";
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
  const storage = useIndexedDB<CarSetup[]>("setups");
  const [setups, setSetups] = useState<string[]>([]);

  const fetchSetups = async () => {
    const keys = await storage.keys();
    setSetups(keys);
  };

  useEffect(() => {
    fetchSetups();
  }, []);

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
      <div className="flex gap-4 py-2 items-center">
        <Button
          onClick={() => {
            const parsedData = parseCsv(csv);
            setSetup({
              type: "UPDATE_DATA",
              data: parsedData,
            });
            setCsv("");
            setIsOpen(false);
          }}
          disabled={!csv.trim()}
        >
          Load Csv
        </Button>
        <article className="flex gap-2">
          <Autocomplete
            disabled={setups.length === 0}
            key={setups.length}
            value={setup.name !== "New Setup" ? setup.name : ""}
            placeholder="Select a setup"
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
        </article>
      </div>
    </section>,
    document.body
  );
};
