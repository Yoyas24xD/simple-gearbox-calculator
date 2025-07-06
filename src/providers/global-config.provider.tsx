import { useMemo, useReducer, type ReactNode } from "react";
import {
  GlobalConfigContext,
  type Action,
  type GlobalConfig,
} from "../hooks/use-global-config";

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
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
};

const saveToLocalStorage = (state: GlobalConfig) => {
  localStorage.setItem("globalConfig", JSON.stringify(state));
};

export const GlobalConfigProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
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
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GlobalConfigContext.Provider value={value}>
      {children}
    </GlobalConfigContext.Provider>
  );
};
