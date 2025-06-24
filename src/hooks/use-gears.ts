import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface GearsContextProps {
  gears: number[];
  finalDrive: number;
  wheelCircumference: number;
  setGears: Dispatch<SetStateAction<number[]>>;
  setFinalDrive: Dispatch<SetStateAction<number>>;
  setWheelCircumference: Dispatch<SetStateAction<number>>;
}

export const GearsContext = createContext<GearsContextProps | null>(null);

export const useGears = () => {
  const context = useContext(GearsContext);
  if (!context) {
    throw new Error("useGears must be used within a GearsProvider");
  }
  return context;
};
