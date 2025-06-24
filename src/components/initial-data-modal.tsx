import { useState } from "react";
import { createPortal } from "react-dom";
import { useInitialData } from "../hooks/use-initial-data";

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
        className="w-full h-full"
        rows={10}
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => {
          const parsedData = parseCsv(csv);
          setData(parsedData);
          setCsv(""); // Clear the input after submission
          console.log("Parsed Data:", parsedData); // For debugging
          setIsOpen(false); // Close the modal after submission
        }}
      >
        Submit
      </button>
    </section>,
    document.body
  );
};
