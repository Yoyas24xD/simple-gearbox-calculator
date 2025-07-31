import type { JSX } from "react";
import { Header } from "../components/header";
import { Input } from "../components/ui/input";
import { useCarSetup } from "../hooks/use-car-setup";

const RIDE_FREQUENCY = 3; // Hz
const DAMPING_RATIO = 1;

export const Suspension = () => {
  const { setup, setSetup } = useCarSetup();

  // Front suspension calculations
  const frontWeight = (setup.weightDistribution[0] / 100) * setup.weight;
  const frontSprungMass = frontWeight / 2 - setup.wheelWeight;
  const frontSpringStiffness =
    4 * Math.PI ** 2 * frontSprungMass * RIDE_FREQUENCY ** 2;
  const frontDampingCoefficient =
    2 *
    DAMPING_RATIO *
    Math.sqrt(frontSpringStiffness * frontSprungMass) *
    DAMPING_RATIO;

  // Rear suspension calculations
  const rearWeight = (setup.weightDistribution[1] / 100) * setup.weight;
  const rearSprungMass = rearWeight / 2 - setup.wheelWeight;
  const rearSpringStiffness =
    4 * Math.PI ** 2 * rearSprungMass * RIDE_FREQUENCY ** 2;
  const rearDampingCoefficient =
    2 *
    DAMPING_RATIO *
    Math.sqrt(rearSpringStiffness * rearSprungMass) *
    DAMPING_RATIO;

  const renderGeneralParameters = (): JSX.Element => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4 border-gray-200">
        General Car Parameters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <Input
            label="Total Weight (kg)"
            type="number"
            id="weight"
            value={setup.weight}
            onChange={(e) =>
              setSetup({
                type: "UPDATE_WEIGHT",
                weight: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <Input
            label="Wheel Weight (kg)"
            type="number"
            id="wheelWeight"
            value={setup.wheelWeight}
            onChange={(e) =>
              setSetup({
                type: "UPDATE_WHEEL_WEIGHT",
                wheelWeight: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <Input
            label="Front Weight Distribution (%)"
            type="number"
            min={0}
            max={100}
            id="weight-distribution-front"
            value={setup.weightDistribution[0]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [value, 100 - value],
              });
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
          <Input
            label="Rear Weight Distribution (%)"
            type="number"
            min={0}
            max={100}
            id="weight-distribution-rear"
            value={setup.weightDistribution[1]}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSetup({
                type: "UPDATE_WEIGHT_DISTRIBUTION",
                weightDistribution: [100 - value, value],
              });
            }}
          />
        </div>
      </div>
    </div>
  );

  // Helper function for rendering a damper settings section (reusable for front and rear)
  const renderDamperSection = (
    title: string,
    stiffness: number,
    dampingCoefficient: number,
  ): JSX.Element => (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Stiffness (N/mm)"
          type="number"
          value={(stiffness / 1000).toFixed(2)} // Convert to N/mm
          readOnly
          className="!text-blue-700 font-bold" // Highlight calculated values
        />
        <Input
          label="Bump"
          type="number"
          value={Math.trunc((dampingCoefficient * 2) / 3)}
          readOnly
          className="!text-blue-700 font-bold"
        />
        <Input
          label="Fast Bump"
          type="number"
          value={Math.trunc((dampingCoefficient * 1) / 3)}
          readOnly
          className="!text-blue-700 font-bold"
        />
        <Input
          label="Rebound"
          type="number"
          value={Math.trunc((dampingCoefficient * 3) / 2)}
          readOnly
          className="!text-blue-700 font-bold"
        />
        <Input
          label="Fast Rebound"
          type="number"
          value={Math.trunc((dampingCoefficient * 3) / 4)}
          readOnly
          className="!text-blue-700 font-bold"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-inter">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {renderGeneralParameters()}
          <hr className="border-t-2 border-gray-200 my-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {renderDamperSection(
              "Front Dampers",
              frontSpringStiffness,
              frontDampingCoefficient,
            )}
            {renderDamperSection(
              "Rear Dampers",
              rearSpringStiffness,
              rearDampingCoefficient,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
