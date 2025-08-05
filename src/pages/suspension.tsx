import { useState, type JSX } from "react";
import { Header } from "../components/header";
import { Input } from "../components/ui/input";
import { useCarSetup } from "../hooks/use-car-setup";
import {
  MAX_RIDE_FREQUENCY,
  MAX_ROLL_GRADIENT,
  MIN_RIDE_FREQUENCY,
  MIN_ROLL_GRADIENT,
} from "../config";

const RIDE_FREQUENCY = 3; // Hz
const DAMPING_RATIO = 1;
const TIRE_RATE = 35 * 9.80665 * 1000; // N/mm, 35 kgf/mm + 9.80665 kN/m (converted to N/mm)

export const Suspension = () => {
  const { setup, setSetup } = useCarSetup();
  const [rideFrequency, setRideFrequency] = useState(RIDE_FREQUENCY);
  const [dampingRatio, setDampingRatio] = useState(DAMPING_RATIO);
  // Front suspension calculations
  const frontWeight = (setup.weightDistribution[0] / 100) * setup.weight;
  const frontSprungMass = frontWeight / 2 - setup.wheel.weight;
  const frontSpringStiffness =
    4 * Math.PI ** 2 * frontSprungMass * rideFrequency ** 2;
  const frontDampingCoefficient =
    2 *
    dampingRatio *
    Math.sqrt(frontSpringStiffness * frontSprungMass) *
    dampingRatio;

  // Rear suspension calculations
  const rearWeight = (setup.weightDistribution[1] / 100) * setup.weight;
  const rearSprungMass = rearWeight / 2 - setup.wheel.weight;
  const rearSpringStiffness =
    4 * Math.PI ** 2 * rearSprungMass * rideFrequency ** 2;
  const rearDampingCoefficient =
    2 *
    dampingRatio *
    Math.sqrt(rearSpringStiffness * rearSprungMass) *
    dampingRatio;

  // Anti-roll bar calculations
  const trackWidthMean =
    (setup.suspension.frontWheelOffset / 100 +
      (setup.baseCar?.f_track_width ?? 0) +
      setup.suspension.rearWheelOffset / 100 +
      (setup.baseCar?.r_track_width ?? 0)) /
    2;

  const trackWidthMoment = trackWidthMean ** 2 / 2; // Momento de inercia lateral simplificado

  const wheelRateMean = (frontSpringStiffness + rearSpringStiffness) / 2;

  const magicNumber = (setup.weightDistribution[0] / 100) * 1.05 * 100;

  const desiredRollRate =
    (setup.weight * (setup.baseCar?.height ?? 0)) /
    setup.suspension.rollGradient;

  const totalRollRate =
    ((Math.PI / 180) * (desiredRollRate * TIRE_RATE * trackWidthMoment)) /
      ((TIRE_RATE * trackWidthMoment * Math.PI) / 180 - desiredRollRate) -
    (Math.PI * wheelRateMean * trackWidthMean ** 2) / 2 / 180;

  const frontAntiRollBarStiffness =
    (((totalRollRate * magicNumber) / 100) * Math.PI) /
    (180 * trackWidthMean ** 2);

  const rearAntiRollBarStiffness =
    (((totalRollRate * (100 - magicNumber)) / 100) * Math.PI) /
    (180 * trackWidthMean ** 2);

  const renderGeneralParameters = (): JSX.Element => (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Chasis parameters
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <Input
              label="Height (m)"
              type="number"
              value={setup.baseCar?.height}
              readOnly={setup.baseCar !== null}
              helperText="Value from selected chassis (read-only)"
            />
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <Input
              label="Front wheel offset (cm)"
              type="number"
              step={0.5}
              value={setup.suspension.frontWheelOffset}
              onChange={(e) =>
                setSetup({
                  type: "UPDATE_SUSPENSION",
                  suspension: {
                    ...setup.suspension,
                    frontWheelOffset: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <Input
              label="Rear wheel offset (cm)"
              type="number"
              step={0.5}
              value={setup.suspension.rearWheelOffset}
              onChange={(e) =>
                setSetup({
                  type: "UPDATE_SUSPENSION",
                  suspension: {
                    ...setup.suspension,
                    rearWheelOffset: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
            <Input
              label="Roll gradient (deg)"
              type="number"
              min={MIN_ROLL_GRADIENT}
              max={MAX_ROLL_GRADIENT}
              step={0.001}
              value={setup.suspension.rollGradient}
              onChange={(e) =>
                setSetup({
                  type: "UPDATE_SUSPENSION",
                  suspension: {
                    ...setup.suspension,
                    rollGradient: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </section>
      </section>
      <section className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 pb-4">
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
              value={setup.wheel.weight}
              onChange={(e) =>
                setSetup({
                  type: "UPDATE_WHEEL",
                  wheel: { ...setup.wheel, weight: Number(e.target.value) },
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
      </section>
    </div>
  );

  // Helper function for rendering a damper settings section (reusable for front and rear)
  const renderDamperSection = (
    title: string,
    stiffness: number,
    dampingCoefficient: number,
    arbStiffness: number,
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
        <Input
          label="Anti-Roll Bar Stiffness (N/mm)"
          type="number"
          value={(arbStiffness ?? 0).toFixed(2)}
          readOnly
          className="!text-blue-700 font-bold"
        />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-4 max-w-7xl min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-inter">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-8">
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm w-64">
                <Input
                  label="Ride Frequency (Hz)"
                  type="number"
                  min={0.1}
                  step={0.01}
                  value={rideFrequency}
                  onChange={(e) =>
                    setRideFrequency(
                      Math.min(
                        Math.max(Number(e.target.value), MIN_RIDE_FREQUENCY),
                        MAX_RIDE_FREQUENCY,
                      ),
                    )
                  }
                  helperText={`Min: ${MIN_RIDE_FREQUENCY} Hz, Max: ${MAX_RIDE_FREQUENCY} Hz`}
                />
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm w-64">
                <Input
                  label="Damping Ratio"
                  type="number"
                  min={0}
                  step={0.01}
                  value={dampingRatio}
                  onChange={(e) => setDampingRatio(Number(e.target.value))}
                />
              </div>
            </div>
            {renderGeneralParameters()}
            <hr className="border-t-2 border-gray-200 my-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {renderDamperSection(
                "Front Dampers",
                frontSpringStiffness,
                frontDampingCoefficient,
                frontAntiRollBarStiffness,
              )}
              {renderDamperSection(
                "Rear Dampers",
                rearSpringStiffness,
                rearDampingCoefficient,
                rearAntiRollBarStiffness,
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
