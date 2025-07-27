import { useMemo } from "react";
import type { CarSetup } from "./use-car-setup";

export const useHpLine = (data: CarSetup["torqueLine"]) => {
  return useMemo(() => {
    return data.map(({ rpm, torque }) => ((rpm * torque) / 9549) * 1.34102);
  }, [data]);
};
