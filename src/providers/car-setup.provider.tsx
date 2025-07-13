import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import {
  CarSetupContext,
  type CarSetup,
  type UpdateSetupAction,
} from "../hooks/use-car-setup";
import { useGlobalConfig } from "../hooks/use-global-config";

const INITIAL_SETUP: CarSetup = {
  data: [],
  gears: [],
  finalDrive: 3.5,
  wheelCircumference: 80,
};

const carSetupReducer = (state: CarSetup, action: UpdateSetupAction) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.data };
    case "UPDATE_GEARS":
      return { ...state, gears: action.gears };
    case "UPDATE_FINAL_DRIVE":
      return { ...state, finalDrive: action.finalDrive };
    case "UPDATE_WHEEL_CIRCUMFERENCE":
      return { ...state, wheelCircumference: action.wheelCircumference };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
};

export const CarSetupProvider = ({ children }: { children: ReactNode }) => {
  const { config } = useGlobalConfig();
  const [setup, dispatch] = useReducer(carSetupReducer, INITIAL_SETUP);

  useEffect(() => {
    if (setup.gears.length < config.gearCount) {
      dispatch({
        type: "UPDATE_GEARS",
        gears: [
          ...setup.gears,
          ...Array(config.gearCount - setup.gears.length).fill(0),
        ],
      });
    } else if (setup.gears.length > config.gearCount) {
      dispatch({
        type: "UPDATE_GEARS",
        gears: setup.gears.slice(0, config.gearCount),
      });
    }
  }, [config.gearCount]);

  return (
    <CarSetupContext.Provider
      value={useMemo(
        () => ({
          setup,
          setSetup: dispatch,
          persistSetup: () => {
            // Implement persistence logic here, e.g., saving to local storage
          },
          loadSetup: () => {
            // Implement loading logic here, e.g., fetching from local storage
          },
        }),
        [setup, dispatch]
      )}
    >
      {children}
    </CarSetupContext.Provider>
  );
};
