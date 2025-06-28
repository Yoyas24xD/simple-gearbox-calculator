import { useGears } from "../hooks/use-gears";
import { Input } from "./ui/input";

export const GearConfig = () => {
  const { gears, finalDrive, setGears, setFinalDrive } = useGears();

  const handleChange = (value: string, index: number) => {
    setGears((prev) => prev.map((g, i) => (i === index ? Number(value) : g)));
  };

  return (
    <section>
      <h2>Gear Configuration</h2>
      <div className="flex gap-4">
        <div>
          <label htmlFor="final-drive">Final Drive Ratio:</label>
          <Input
            id="final-drive"
            type="number"
            value={finalDrive}
            onChange={(e) => setFinalDrive(Number(e.target.value))}
          />
        </div>
        {gears.map((gear, index) => (
          <div key={index}>
            <label htmlFor={`gear-${index}`}>Gear {index + 1}:</label>
            <Input
              id={`gear-${index}`}
              type="number"
              value={gear}
              step="0.01"
              onChange={(e) => handleChange(e.target.value, index)}
              min={0}
              max={10}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
