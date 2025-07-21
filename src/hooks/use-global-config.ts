import { createContext, useContext, type Dispatch } from "react";

export interface GraphConfig {
  height: number;
  show: boolean;
  showPoints: boolean;
}

export interface GlobalConfig {
  hpTorqueGraph: GraphConfig;
  gearsGraph: GraphConfig;
  gearCount: number;
}

export type Action =
  | { type: "SET_HP_TORQUE_GRAPH"; payload: GraphConfig; skipSave?: boolean }
  | { type: "SET_GEARS_GRAPH"; payload: GraphConfig; skipSave?: boolean }
  | { type: "SET_GEAR_COUNT"; payload: number; skipSave?: boolean }
  | { type: "SET_ALL"; payload: GlobalConfig; skipSave?: boolean };

export const GlobalConfigContext = createContext<{
  config: GlobalConfig;
  dispatch: Dispatch<Action>;
} | null>(null);

export const useGlobalConfig = () => {
  const context = useContext(GlobalConfigContext);

  if (!context) {
    throw new Error(
      "useInitialData must be used within an InitialDataProvider"
    );
  }

  return context;
};
