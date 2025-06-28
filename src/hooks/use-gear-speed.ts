import { useGears } from "./use-gears";
import { useInitialData } from "./use-initial-data";

export const useGearSpeed = (rpm: number, gearRatio: number): number => {
  const { finalDrive, wheelCircumference } = useGears();
  return computeSpeedFromRpm(rpm, wheelCircumference, gearRatio, finalDrive);
};

export const useGearSpeeds = (gearRatio: number): number[] => {
  const { data } = useInitialData();
  const { finalDrive, wheelCircumference } = useGears();
  return data.map(({ rpm }) =>
    computeSpeedFromRpm(rpm, wheelCircumference, gearRatio, finalDrive)
  );
};

export const useGearsSpeeds = (): number[][] => {
  const { gears, wheelCircumference, finalDrive } = useGears();
  const { data } = useInitialData();

  return gears.map((gearRatio) =>
    data.map(({ rpm }) =>
      computeSpeedFromRpm(rpm, wheelCircumference, gearRatio, finalDrive)
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
