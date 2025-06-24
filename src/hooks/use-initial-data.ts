import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface InitialDataContextProps {
  data: { rpm: number; torque: number }[];
  setData: Dispatch<SetStateAction<InitialDataContextProps["data"]>>;
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
