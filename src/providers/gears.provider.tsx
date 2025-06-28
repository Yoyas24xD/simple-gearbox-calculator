import { useMemo, useState, type ReactNode } from "react";
import { GearsContext } from "../hooks/use-gears";

export const GearsProvider = ({ children }: { children: ReactNode }) => {
  const [gears, setGears] = useState<number[]>([
    3.57, 2.82, 2.3, 1.96, 1.7, 1.46, 1.23, 1.11,
  ]);
  const [finalDrive, setFinalDrive] = useState<number>(3.5);
  const [wheelCircumference, setWheelCircumference] = useState<number>(80.0);

  const value = useMemo(
    () => ({
      gears,
      finalDrive,
      wheelCircumference,
      setGears,
      setFinalDrive,
      setWheelCircumference,
    }),
    [gears, finalDrive, wheelCircumference]
  );

  return (
    <GearsContext.Provider value={value}>{children}</GearsContext.Provider>
  );
};
