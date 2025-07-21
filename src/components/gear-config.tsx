import { useRef } from "react";
import { useCarSetup } from "../hooks/use-car-setup";
import { Input } from "./ui/input";

export const GearConfig = () => {
  const { setup, setSetup } = useCarSetup();
  const lastValue = useRef<string>("");

  const handleChange = (value: string, index: number) => {
    lastValue.current = value;
    setSetup({
      type: "UPDATE_GEARS",
      gears: setup.gears.map((g, i) => (i === index ? Number(value) : g)),
    });
  };

  return (
    <section>
      <h2>Gear Configuration</h2>
      <div className="flex gap-2 items-end">
        <div className="w-[10ch]">
          <label htmlFor="final-drive" className="whitespace-nowrap">
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
            <label htmlFor={`gear-${index}`}>Gear {index + 1}:</label>
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
      </div>
    </section>
  );
};
