import { createContext, useContext } from "react";
import type cars from "../data/cars.json";

export interface CarSetup {
  torqueLine: { rpm: number; torque: number }[];
  gears: number[];
  finalDrive: number;
  name: string;
  weight: number;
  weightDistribution: [front: number, rear: number];
  wheel: {
    width: number;
    profile: number;
    rimDiameter: number;
    weight: number;
    circumference: number; // This will be calculated based on width, profile, and rim diameter
    isAwd: boolean;
  };
  lastModified?: Date;
  baseCar: (typeof cars)[number] | null;
}

export type UpdateSetupAction =
  | { type: "UPDATE_TORQUE_LINE"; data: CarSetup["torqueLine"] }
  | { type: "UPDATE_GEARS"; gears: number[] }
  | { type: "UPDATE_FINAL_DRIVE"; finalDrive: number }
  | { type: "UPDATE_WHEEL_CIRCUMFERENCE"; wheelCircumference: number }
  | { type: "UPDATE_SETUP_NAME"; name: string }
  | { type: "UPDATE_WEIGHT"; weight: number }
  | {
      type: "UPDATE_WEIGHT_DISTRIBUTION";
      weightDistribution: CarSetup["weightDistribution"];
    }
  | { type: "UPDATE_WHEEL"; wheel: CarSetup["wheel"] }
  | { type: "UPDATE_BASE_CAR"; baseCar: CarSetup["baseCar"] }
  | { type: "UPDATE_LAST_MODIFIED"; lastModified: Date }
  | { type: "UPDATE_ALL"; setup: CarSetup };

export interface CarSetupReducer {
  setup: CarSetup;
  isModified: boolean;
  setSetup: (action: UpdateSetupAction) => void;
  persistSetup: () => void;
  loadSetup: (name: string) => void;
  deleteSetup: (name: string) => void;
  attachToCar: (car: CarSetup["baseCar"]) => void;
  clearSetup: () => void;
}

export const CarSetupContext = createContext<CarSetupReducer | null>(null);

export const useCarSetup = () => {
  const context = useContext(CarSetupContext);

  if (!context) {
    throw new Error("useCarSetup must be used within a CarSetupProvider");
  }

  return context;
};
