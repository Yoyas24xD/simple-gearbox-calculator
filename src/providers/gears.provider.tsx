import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GearsContext } from "../hooks/use-gears";
import { useGlobalConfig } from "../hooks/use-global-config";

export const GearsProvider = ({ children }: { children: ReactNode }) => {
  const { config } = useGlobalConfig();
  const [gears, setGears] = useState<number[]>(Array(config.gearCount).fill(0));
  const [finalDrive, setFinalDrive] = useState<number>(3.5);
  const [wheelCircumference, setWheelCircumference] = useState<number>(80.0);

  useEffect(() => {
    setGears((prev) => {
      if (prev.length < config.gearCount) {
        return [...prev, ...Array(config.gearCount - prev.length).fill(0)];
      } else if (prev.length > config.gearCount) {
        return prev.slice(0, config.gearCount);
      }
      return prev;
    });
  }, [config.gearCount]);

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
