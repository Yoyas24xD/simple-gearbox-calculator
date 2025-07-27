import { useMemo } from "react";
import { useCarSetup } from "./use-car-setup";

interface GearSpeed {
  rpm: number;
  speed: number;
}

export const useGearSpeed = (rpm: number, gearRatio: number): number => {
  const { setup } = useCarSetup();
  return computeSpeedFromRpm(
    rpm,
    setup.wheelCircumference,
    gearRatio,
    setup.finalDrive,
  );
};

export const useGearSpeeds = (gearRatio: number): GearSpeed[] => {
  const { setup } = useCarSetup();
  return useMemo(
    () =>
      setup.torqueLine.map(({ rpm }) => ({
        rpm,
        speed: computeSpeedFromRpm(
          rpm,
          setup.wheelCircumference,
          gearRatio,
          setup.finalDrive,
        ),
      })),
    [setup.torqueLine, setup.wheelCircumference, gearRatio, setup.finalDrive],
  );
};

export const useGearsSpeeds = (): GearSpeed[][] => {
  const { setup } = useCarSetup();

  return useMemo(
    () =>
      setup.gears.map((gearRatio) =>
        setup.torqueLine.map(({ rpm }) => ({
          rpm,
          speed: computeSpeedFromRpm(
            rpm,
            setup.wheelCircumference,
            gearRatio,
            setup.finalDrive,
          ),
        })),
      ),
    [setup.gears, setup.torqueLine, setup.wheelCircumference, setup.finalDrive],
  );
};

export function computeSpeedFromRpm(
  rpm: number,
  wheelCircumference: number,
  gearRatio: number,
  finalDrive: number,
): number {
  return (
    ((rpm * 60 * wheelCircumference) / 63360 / (gearRatio * finalDrive)) *
    1.60934
  );
}
