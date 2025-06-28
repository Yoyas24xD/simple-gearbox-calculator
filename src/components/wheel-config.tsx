import { useState } from "react";
import { useGears } from "../hooks/use-gears";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface WheelConfigState {
  width: number;
  profile: number;
  rimDiameter: number;
  isAwd: boolean;
}

export const WheelConfig = () => {
  const { wheelCircumference, setWheelCircumference } = useGears();
  const [state, setState] = useState<WheelConfigState>({
    width: 305,
    profile: 0.3,
    rimDiameter: 17,
    isAwd: false,
  });

  const handleChange = (
    field: keyof WheelConfigState,
    value: number | boolean
  ) => {
    const newState = { ...state, [field]: value };
    setState(newState);

    const { width, profile, rimDiameter } = newState;
    if (width > 0 && profile > 0 && rimDiameter > 0) {
      const wheelNumber = newState.isAwd ? 4 : 2;
      const circumference =
        Math.PI * (rimDiameter + ((width * profile) / 25.4) * wheelNumber);
      setWheelCircumference(circumference);
    }
  };

  const createInputHandler =
    (field: keyof WheelConfigState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox"
          ? e.target.checked
          : Math.max(0, Number(e.target.value));
      handleChange(field, value);
    };

  return (
    <section>
      <h2>Wheel Configuration</h2>
      <div className="flex gap-2 items-center">
        <div>
          <label htmlFor="wheel-width">Wheel width:</label>
          <Input
            id="wheel-width"
            type="number"
            value={state.width}
            onChange={createInputHandler("width")}
          />
        </div>
        <div>
          <label htmlFor="wheel-profile">Wheel profile:</label>
          <Input
            id="wheel-profile"
            type="number"
            value={state.profile}
            onChange={createInputHandler("profile")}
          />
        </div>
        <div>
          <label htmlFor="rim-diameter">Rim diameter:</label>
          <Input
            id="rim-diameter"
            type="number"
            value={state.rimDiameter}
            onChange={createInputHandler("rimDiameter")}
          />
        </div>
        <div className="flex gap-1 items-center">
          <span>Is AWD: </span>
          <Checkbox
            checked={state.isAwd}
            onChange={createInputHandler("isAwd")}
          />
        </div>
        <div>
          <p>
            Wheel Circumference:{" "}
            <span className="text-amber-400">
              {wheelCircumference.toFixed(2)}
            </span>{" "}
            mm
          </p>
        </div>
      </div>
    </section>
  );
};
