import { useGears } from "../hooks/use-gears";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const MAX_GEARS = 8;
const MIN_GEARS = 5;

export const GearConfig = () => {
  const { gears, finalDrive, setGears, setFinalDrive } = useGears();

  const handleChange = (value: string, index: number) => {
    setGears((prev) => prev.map((g, i) => (i === index ? Number(value) : g)));
  };

  const handleDelete = (index: number) =>
    setGears((prev) => prev.filter((_, i) => i !== index));

  return (
    <section>
      <h2>Gear Configuration</h2>
      <div className="flex gap-4">
        <div>
          <label htmlFor="final-drive">Final Drive Ratio:</label>
          <Input
            id="final-drive"
            step={0.01}
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
            {gears.length > MIN_GEARS && (
              <Button flavor="danger" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            )}
          </div>
        ))}
        {gears.length < MAX_GEARS && (
          <Button
            flavor="primary"
            onClick={() => setGears((prev) => [...prev, 0])}
          >
            Add Gear
          </Button>
        )}
      </div>
    </section>
  );
};
