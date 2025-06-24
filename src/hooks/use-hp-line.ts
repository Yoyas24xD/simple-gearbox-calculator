import { useMemo } from "react";
import type { InitialDataContextProps } from "./use-initial-data";

export const useHpLine = (data: InitialDataContextProps["data"]) => {
  return useMemo(() => {
    return data.map(({ rpm, torque }) => ((rpm * torque) / 9549) * 1.34102);
  }, [data]);
};
