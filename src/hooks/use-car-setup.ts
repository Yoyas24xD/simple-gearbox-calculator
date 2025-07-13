import { createContext, useContext } from "react";

export interface CarSetup {
  data: { rpm: number; torque: number }[];
  gears: number[];
  finalDrive: number;
  wheelCircumference: number;
}

export type UpdateSetupAction =
  | { type: "UPDATE_DATA"; data: CarSetup["data"] }
  | { type: "UPDATE_GEARS"; gears: number[] }
  | { type: "UPDATE_FINAL_DRIVE"; finalDrive: number }
  | { type: "UPDATE_WHEEL_CIRCUMFERENCE"; wheelCircumference: number };

export interface CarSetupReducer {
  setup: CarSetup;
  setSetup: (action: UpdateSetupAction) => void;
  persistSetup: () => void;
  loadSetup: () => void;
}

export const CarSetupContext = createContext<CarSetupReducer | null>(null);

export const useCarSetup = () => {
  const context = useContext(CarSetupContext);

  if (!context) {
    throw new Error("useCarSetup must be used within a CarSetupProvider");
  }

  return context;
};
