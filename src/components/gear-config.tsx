import { Plus } from "lucide-react";
import { useRef } from "react";
import { useCarSetup } from "../hooks/use-car-setup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const GearConfig = () => {
  const { setup, setSetup } = useCarSetup();
  const lastValue = useRef("");

  const handleChange = (value: string, index: number) => {
    lastValue.current = value;
    setSetup({
      type: "UPDATE_GEARS",
      gears: setup.gears.map((g, i) => (i === index ? Number(value) : g)),
    });
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Gear Configuration
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end">
        <div className="col-span-full sm:col-span-1">
          <label
            htmlFor="final-drive"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Final Drive:
          </label>
          <Input
            id="final-drive"
            step={0.01}
            type="number"
            value={setup.finalDrive}
            onChange={(e) =>
              setSetup({
                type: "UPDATE_FINAL_DRIVE",
                finalDrive: Number(e.target.value),
              })
            }
          />
        </div>
        {setup.gears.map((gear, index) => (
          <div key={index}>
            <label
              htmlFor={`gear-${index}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gear {index + 1}:
            </label>
            <div id={`gear-${index}`} className="flex items-center gap-1">
              <Input
                type="number"
                value={gear === 0 && lastValue.current !== "0" ? "" : gear}
                step="0.01"
                onChange={(e) => handleChange(e.target.value, index)}
                min={0}
                max={10}
              />
            </div>
          </div>
        ))}
        <div className="col-span-full sm:col-span-1 flex items-end">
          <Button
            flavor="ghost"
            className="w-full h-full border border-dashed border-gray-300 hover:border-blue-500 text-gray-500 hover:text-blue-600 py-3"
          >
            <Plus className="w-5 h-5 mr-1" /> Add Gear
          </Button>
        </div>
      </div>
    </section>
  );
};
