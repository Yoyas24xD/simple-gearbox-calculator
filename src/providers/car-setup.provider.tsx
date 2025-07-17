import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import {
  CarSetupContext,
  type CarSetup,
  type UpdateSetupAction,
} from "../hooks/use-car-setup";
import { useDebounce } from "../hooks/use-debounce";
import { useGlobalConfig } from "../hooks/use-global-config";
import { StorageFactory } from "../storage/storage-factory";
import { toast } from "sonner";

const INITIAL_SETUP: CarSetup = {
  data: [],
  gears: [],
  finalDrive: 3.5,
  wheelCircumference: 80,
  name: "New Setup",
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
    case "UPDATE_SETUP_NAME":
      return { ...state, setupName: action.setupName };
    case "UPDATE_ALL":
      return { ...state, ...action.setup };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
};

export const CarSetupProvider = ({ children }: { children: ReactNode }) => {
  const [setup, dispatch] = useReducer(carSetupReducer, INITIAL_SETUP);
  const { config } = useGlobalConfig();
  const storage = StorageFactory.getStorage<CarSetup>("indexeddb");
  const debouncedSave = useDebounce(
    (setup: CarSetup) =>
      toast.promise(storage.save(setup.name, setup), {
        loading: "Saving setup...",
        success: "Setup saved successfully!",
        error: "Failed to save setup.",
      }),
    500
  );

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
          persistSetup: () => debouncedSave(setup),
          loadSetup: async (name: string) => {
            const savedSetup = await storage.load(name);
            if (!savedSetup) {
              console.warn(`No setup found for name: ${name}`);
              return;
            }
            dispatch({ type: "UPDATE_ALL", setup: savedSetup });
          },
        }),
        [setup, dispatch]
      )}
    >
      {children}
    </CarSetupContext.Provider>
  );
};
