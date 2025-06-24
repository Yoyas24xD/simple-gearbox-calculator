import { useMemo, useState, type ReactNode } from "react";
import {
  InitialDataContext,
  type InitialDataContextProps,
} from "../hooks/use-initial-data";

export const InitialDataProvider = ({ children }: { children: ReactNode }) => {
  const [innerData, setInnerData] = useState<InitialDataContextProps["data"]>(
    []
  );

  const setData = (data: InitialDataContextProps["data"]) => {
    const mappedData = data.map(({ rpm, torque }) => ({
      rpm: rpm < 1000 ? rpm * 1000 : rpm,
      torque,
    }));
    setInnerData(mappedData);
  };

  const value = useMemo(
    () => ({
      data: innerData,
      setData: setData,
    }),
    [innerData]
  );

  return (
    <InitialDataContext.Provider value={value}>
      {children}
    </InitialDataContext.Provider>
  );
};
