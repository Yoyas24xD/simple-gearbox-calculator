import { createContext, useContext } from "react";

export interface InitialDataContextProps {
  data: { rpm: number; torque: number }[];
  setData: (data: InitialDataContextProps["data"]) => void;
}

export const InitialDataContext = createContext<InitialDataContextProps | null>(
  null
);

export const useInitialData = () => {
  const context = useContext(InitialDataContext);

  if (!context) {
    throw new Error(
      "useInitialData must be used within an InitialDataProvider"
    );
  }

  return context;
};
