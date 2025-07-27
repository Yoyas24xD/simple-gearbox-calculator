import { createContext, useContext } from "react";

export interface CarSetup {
  torqueLine: { rpm: number; torque: number }[];
  gears: number[];
  finalDrive: number;
  wheelCircumference: number;
  name: string;
}

export type UpdateSetupAction =
  | { type: "UPDATE_DATA"; data: CarSetup["torqueLine"] }
  | { type: "UPDATE_GEARS"; gears: number[] }
  | { type: "UPDATE_FINAL_DRIVE"; finalDrive: number }
  | { type: "UPDATE_WHEEL_CIRCUMFERENCE"; wheelCircumference: number }
  | { type: "UPDATE_SETUP_NAME"; name: string }
  | { type: "UPDATE_ALL"; setup: CarSetup };

export interface CarSetupReducer {
  setup: CarSetup;
  setSetup: (action: UpdateSetupAction) => void;
  persistSetup: () => void;
  loadSetup: (name: string) => void;
  deleteSetup: (name: string) => void;
}

export const CarSetupContext = createContext<CarSetupReducer | null>(null);

export const useCarSetup = () => {
  const context = useContext(CarSetupContext);

  if (!context) {
    throw new Error("useCarSetup must be used within a CarSetupProvider");
  }

  return context;
};
