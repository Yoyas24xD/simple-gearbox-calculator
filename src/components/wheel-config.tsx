import { useEffect, useState } from "react";
import { useCarSetup } from "../hooks/use-car-setup";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface WheelConfigState {
  width: number;
  profile: number;
  rimDiameter: number;
  isAwd: boolean;
}

export const WheelConfig = () => {
  const { setup, setSetup } = useCarSetup();
  const [state, setState] = useState<WheelConfigState>({
    width: 305,
    profile: 0.3,
    rimDiameter: 17,
    isAwd: false,
  });

  const handleChange = (
    field: keyof WheelConfigState,
    value: number | boolean,
  ) => {
    const newState = { ...state, [field]: value };
    setState(newState);

    const { width, profile, rimDiameter } = newState;
    if (width > 0 && profile > 0 && rimDiameter > 0) {
      const wheelNumber = newState.isAwd ? 4 : 2;
      const circumference =
        Math.PI * (rimDiameter + ((width * profile) / 25.4) * wheelNumber);
      setSetup({
        type: "UPDATE_WHEEL_CIRCUMFERENCE",
        wheelCircumference: circumference,
      });
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
    <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Wheel Configuration
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div>
          <label
            htmlFor="wheel-width"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Wheel width:
          </label>
          <Input
            id="wheel-width"
            type="number"
            value={state.width}
            onChange={createInputHandler("width")}
          />
        </div>
        <div>
          <label
            htmlFor="wheel-profile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Wheel profile:
          </label>
          <Input
            id="wheel-profile"
            type="number"
            value={state.profile}
            onChange={createInputHandler("profile")}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label
            htmlFor="rim-diameter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rim diameter:
          </label>
          <Input
            id="rim-diameter"
            type="number"
            value={state.rimDiameter}
            onChange={createInputHandler("rimDiameter")}
          />
        </div>
        <div className="flex flex-col h-full justify-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Is AWD:
          </label>
          <div className="flex gap-2 items-center">
            <Checkbox
              checked={state.isAwd}
              onChange={createInputHandler("isAwd")}
            />
            <span className="text-gray-700 text-sm">All-Wheel Drive</span>
          </div>
        </div>
        <div className="col-span-full">
          <p className="text-gray-700 text-sm font-medium">
            Wheel Circumference:{" "}
            <span className="text-blue-600 font-semibold text-base">
              {setup.wheelCircumference.toFixed(2)}
            </span>
            mm
          </p>
        </div>
      </div>
    </section>
  );
};
