import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import { toast } from "sonner";
import {
  CarSetupContext,
  type CarSetup,
  type UpdateSetupAction,
} from "../hooks/use-car-setup";
import { useDebounce } from "../hooks/use-debounce";
import { useGlobalConfig } from "../hooks/use-global-config";
import { StorageFactory } from "../storage/storage-factory";

const INITIAL_SETUP: CarSetup = {
  torqueLine: [],
  gears: [],
  finalDrive: 3.5,
  wheelCircumference: 80,
  name: "New Setup",
  weight: 1500,
  weightDistribution: [50, 50],
  wheelWeight: 12,
  baseCar: null, // Initially no car is attached
};

const carSetupReducer = (
  state: CarSetup,
  action: UpdateSetupAction,
): CarSetup => {
  switch (action.type) {
    case "UPDATE_TORQUE_LINE":
      return { ...state, torqueLine: action.data };
    case "UPDATE_GEARS":
      return { ...state, gears: action.gears };
    case "UPDATE_FINAL_DRIVE":
      return { ...state, finalDrive: action.finalDrive };
    case "UPDATE_WHEEL_CIRCUMFERENCE":
      return { ...state, wheelCircumference: action.wheelCircumference };
    case "UPDATE_SETUP_NAME":
      return { ...state, name: action.name };
    case "UPDATE_ALL":
      return { ...state, ...action.setup };
    case "UPDATE_WEIGHT":
      return { ...state, weight: action.weight };
    case "UPDATE_WEIGHT_DISTRIBUTION":
      return { ...state, weightDistribution: action.weightDistribution };
    case "UPDATE_WHEEL_WEIGHT":
      return { ...state, wheelWeight: action.wheelWeight };
    case "UPDATE_BASE_CAR":
      return {
        ...state,
        baseCar: action.baseCar ? { ...action.baseCar } : null, // TODO: maybe dont need to clone here
      };
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
    500,
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
  }, [config.gearCount, setup.gears]);

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
              toast.warning(`Setup "${name}" not found.`);
              return;
            }
            dispatch({ type: "UPDATE_ALL", setup: savedSetup });
          },
          deleteSetup: async (name: string) => {
            await storage.remove(name);
            toast.success(`Setup "${name}" deleted successfully!`);
            dispatch({ type: "UPDATE_ALL", setup: INITIAL_SETUP });
          },
          attachToCar: (car: CarSetup["baseCar"]) => {
            dispatch({
              type: "UPDATE_ALL",
              setup: {
                ...INITIAL_SETUP,
                baseCar: car ? { ...car } : null,
                torqueLine:
                  car?.engine.default_torque_line ?? INITIAL_SETUP.torqueLine,
                gears: Array(car?.transmission.gears ?? 0).fill(0),
              },
            });
          },
        }),
        [setup, dispatch, storage],
      )}
    >
      {children}
    </CarSetupContext.Provider>
  );
};
