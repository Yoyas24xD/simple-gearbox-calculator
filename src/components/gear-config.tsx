import { useGears } from "../hooks/use-gears";
import { Input } from "./ui/input";

export const GearConfig = () => {
  const { gears, finalDrive, setGears, setFinalDrive } = useGears();

  const handleChange = (value: string, index: number) => {
    setGears((prev) => prev.map((g, i) => (i === index ? Number(value) : g)));
  };

  return (
    <div className="gear-config">
      <h2>Gear Configuration</h2>
      <div>
        <label htmlFor="final-drive">Final Drive Ratio:</label>
        <Input
          id="final-drive"
          type="number"
          value={finalDrive}
          onChange={(e) => setFinalDrive(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Gears</h3>
        {gears.map((gear, index) => (
          <div key={index}>
            <label htmlFor={`gear-${index}`}>Gear {index + 1}:</label>
            <Input
              id={`gear-${index}`}
              type="number"
              value={gear} // TODO: fix this, always shows 0
              step="0.01"
              onChange={(e) => handleChange(e.target.value, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
