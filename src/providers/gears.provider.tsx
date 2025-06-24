import { useMemo, useState, type ReactNode } from "react";
import { GearsContext } from "../hooks/use-gears";

export const GearsProvider = ({ children }: { children: ReactNode }) => {
  const [gears, setGears] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [finalDrive, setFinalDrive] = useState<number>(3.5);
  const [wheelCircumference, setWheelCircumference] = useState<number>(2.0);

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
