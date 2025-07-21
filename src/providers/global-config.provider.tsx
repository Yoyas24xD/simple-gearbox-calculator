import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import { useDebounce } from "../hooks/use-debounce";
import {
  GlobalConfigContext,
  type Action,
  type GlobalConfig,
} from "../hooks/use-global-config";
import { useLocalStorage } from "../hooks/use-storage";

const DEFAULT_CONFIG = {
  hpTorqueGraph: {
    height: 300,
    show: true,
    showPoints: true,
  },
  gearsGraph: {
    height: 300,
    show: true,
    showPoints: true,
  },
  gearCount: 6,
};

const reducer = (state: GlobalConfig, action: Action) => {
  switch (action.type) {
    case "SET_HP_TORQUE_GRAPH":
      return {
        ...state,
        hpTorqueGraph: action.payload,
      };
    case "SET_GEARS_GRAPH":
      return {
        ...state,
        gearsGraph: action.payload,
      };
    case "SET_GEAR_COUNT":
      return {
        ...state,
        gearCount: action.payload,
      };
    case "SET_ALL":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
};

export const GlobalConfigProvider = ({ children }: { children: ReactNode }) => {
  const storage = useLocalStorage<GlobalConfig>("config");
  const debouncedSave = useDebounce(
    (config: GlobalConfig) => storage.save(config),
    1000
  );
  const [state, dispatch] = useReducer(
    (state: GlobalConfig, action: Action) => {
      const newState = reducer(state, action);
      if (!action.skipSave) {
        debouncedSave(newState);
      }
      return newState;
    },
    DEFAULT_CONFIG
  );

  useEffect(() => {
    if (storage.value) {
      dispatch({ type: "SET_ALL", payload: storage.value, skipSave: true });
    }
  }, [storage.value]);

  const value = useMemo(() => ({ config: state, dispatch }), [state, dispatch]);

  return (
    <GlobalConfigContext.Provider value={value}>
      {children}
    </GlobalConfigContext.Provider>
  );
};
