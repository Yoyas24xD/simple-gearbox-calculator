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
  | { type: "SET_HP_TORQUE_GRAPH"; payload: GraphConfig }
  | { type: "SET_GEARS_GRAPH"; payload: GraphConfig }
  | { type: "SET_GEAR_COUNT"; payload: number };

export const GlobalConfigContext = createContext<{
  state: GlobalConfig;
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
