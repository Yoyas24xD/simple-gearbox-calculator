import { useCarSetup, type CarSetup } from "../hooks/use-car-setup";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export const WheelConfig = () => {
  const { setup, setSetup } = useCarSetup();

  const handleChange = (
    field: keyof CarSetup["wheel"],
    value: number | boolean,
  ) => {
    setSetup({
      type: "UPDATE_WHEEL",
      wheel: { ...setup.wheel, [field]: value },
    });
  };

  const createInputHandler =
    (field: keyof CarSetup["wheel"]) =>
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
            value={setup.wheel.width}
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
            value={setup.wheel.profile}
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
            value={setup.wheel.rimDiameter}
            onChange={createInputHandler("rimDiameter")}
          />
        </div>
        <div className="flex flex-col h-full justify-center">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Is AWD:
          </span>
          <div className="flex gap-2 items-center">
            <Checkbox
              checked={setup.wheel.isAwd}
              onChange={createInputHandler("isAwd")}
            />
            <span className="text-gray-700 text-sm">All-Wheel Drive</span>
          </div>
        </div>
        <div className="col-span-full">
          <p className="text-gray-700 text-sm font-medium">
            Wheel Circumference:{" "}
            <span className="text-blue-600 font-semibold text-base">
              {setup.wheel.circumference.toFixed(2)}
            </span>{" "}
            mm
          </p>
        </div>
      </div>
    </section>
  );
};
