import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
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
  name: "New Setup",
  weight: 1500,
  weightDistribution: [50, 50],
  wheel: {
    width: 0,
    profile: 0,
    rimDiameter: 0,
    weight: 12,
    circumference: 0, // This will be calculated based on width, profile, and rim diameter
    isAwd: false,
  },
  baseCar: null, // Initially no car is attached
};

const calculateCircumference = (
  width: number,
  profile: number,
  rimDiameter: number,
  isAwd: boolean,
): number => {
  return Math.PI * (rimDiameter + ((width * profile) / 25.4) * (isAwd ? 4 : 2));
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
    case "UPDATE_WHEEL":
      return {
        ...state,
        wheel: {
          ...state.wheel,
          ...action.wheel,
          circumference: calculateCircumference(
            action.wheel.width,
            action.wheel.profile,
            action.wheel.rimDiameter,
            action.wheel.isAwd,
          ),
        },
      };
    case "UPDATE_SETUP_NAME":
      return { ...state, name: action.name };
    case "UPDATE_ALL":
      return {
        ...state,
        ...action.setup,
        wheel: {
          ...state.wheel,
          ...action.setup.wheel,
          circumference: calculateCircumference(
            action.setup.wheel.width,
            action.setup.wheel.profile,
            action.setup.wheel.rimDiameter,
            action.setup.wheel.isAwd,
          ),
        },
      };
    case "UPDATE_WEIGHT":
      return { ...state, weight: action.weight };
    case "UPDATE_WEIGHT_DISTRIBUTION":
      return { ...state, weightDistribution: action.weightDistribution };
    case "UPDATE_LAST_MODIFIED":
      return { ...state, lastModified: action.lastModified };
    case "UPDATE_BASE_CAR":
      return {
        ...state,
        baseCar: action.baseCar ? { ...action.baseCar } : null, // TODO: maybe dont need to clone here
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const CarSetupProvider = ({ children }: { children: ReactNode }) => {
  const [isModified, setIsModified] = useState(false);
  const [setup, dispatch] = useReducer(carSetupReducer, INITIAL_SETUP);
  const { config } = useGlobalConfig();
  const storage = StorageFactory.getStorage<CarSetup>("indexeddb");

  const debouncedSave = useDebounce((setup: CarSetup) => {
    const date = new Date();
    toast.promise(storage.save(setup.name, { ...setup, lastModified: date }), {
      loading: "Saving setup...",
      success: () => {
        setIsModified(false);
        dispatch({
          type: "UPDATE_LAST_MODIFIED",
          lastModified: date,
        });
        return `Setup "${setup.name}" saved successfully!`;
      },
      error: "Failed to save setup.",
    });
  }, 250);

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
          isModified,
          setSetup: (action: UpdateSetupAction) => {
            if (action.type !== "UPDATE_ALL") {
              setIsModified(true);
            }
            dispatch(action);
          },
          persistSetup: () => debouncedSave(setup),
          loadSetup: async (name: string) => {
            const savedSetup = await storage.load(name);
            if (!savedSetup) {
              toast.warning(`Setup "${name}" not found.`);
              return;
            }
            dispatch({
              type: "UPDATE_ALL",
              setup: {
                ...INITIAL_SETUP,
                ...savedSetup,
                wheel: { ...INITIAL_SETUP.wheel, ...savedSetup.wheel },
              },
            });
            setIsModified(false);
          },
          deleteSetup: async (name: string) => {
            await storage.remove(name);
            toast.success(`Setup "${name}" deleted successfully!`);
            dispatch({ type: "UPDATE_ALL", setup: INITIAL_SETUP });
            setIsModified(false);
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
          clearSetup: () => {
            dispatch({ type: "UPDATE_ALL", setup: INITIAL_SETUP });
            setIsModified(false);
          },
        }),
        [setup, dispatch, storage, isModified],
      )}
    >
      {children}
    </CarSetupContext.Provider>
  );
};
