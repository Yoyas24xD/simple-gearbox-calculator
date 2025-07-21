import { useCarSetup } from "./use-car-setup";

export const useGearSpeed = (rpm: number, gearRatio: number): number => {
  const { setup } = useCarSetup();
  return computeSpeedFromRpm(
    rpm,
    setup.wheelCircumference,
    gearRatio,
    setup.finalDrive
  );
};

export const useGearSpeeds = (gearRatio: number): number[] => {
  const { setup } = useCarSetup();
  return setup.data.map(({ rpm }) =>
    computeSpeedFromRpm(
      rpm,
      setup.wheelCircumference,
      gearRatio,
      setup.finalDrive
    )
  );
};

export const useGearsSpeeds = (): number[][] => {
  const { setup } = useCarSetup();

  return setup.gears.map((gearRatio) =>
    setup.data.map(({ rpm }) =>
      computeSpeedFromRpm(
        rpm,
        setup.wheelCircumference,
        gearRatio,
        setup.finalDrive
      )
    )
  );
};

export function computeSpeedFromRpm(
  rpm: number,
  wheelCircumference: number,
  gearRatio: number,
  finalDrive: number
): number {
  return (
    ((rpm * 60 * wheelCircumference) / 63360 / (gearRatio * finalDrive)) *
    1.60934
  );
}
