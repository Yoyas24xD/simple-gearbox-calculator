import { useMemo, useState, type ReactNode } from "react";
import {
  InitialDataContext,
  type InitialDataContextProps,
} from "../hooks/use-initial-data";

export const InitialDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<InitialDataContextProps["data"]>([]);

  const value = useMemo(
    () => ({
      data,
      setData,
    }),
    [data]
  );

  return (
    <InitialDataContext.Provider value={value}>
      {children}
    </InitialDataContext.Provider>
  );
};
