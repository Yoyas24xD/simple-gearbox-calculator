import type { FC } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Divider } from "./ui/divider";
import { Checkbox } from "./ui/checkbox";
import { useGlobalConfig } from "../hooks/use-global-config";
import { Input } from "./ui/input";

const MAX_GEARS = 8;
const MIN_GEARS = 5;

interface Props {
  open: boolean;
  onClose: () => void;
}

export const GlobalConfig: FC<Props> = ({ open, onClose }) => {
  const { config, dispatch } = useGlobalConfig();

  if (!open) {
    return null;
  }

  return createPortal(
    <section className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <section className="absolute top-1/2 left-1/2 w-1/2 p-4 -translate-x-1/2 -translate-y-1/2 rounded-lg z-50 bg-gray-800 shadow-white/30 shadow-md">
        <h1 className="text-center">App Configuration</h1>
        <Divider />
        <section>
          <p>HP - Torque</p>
          <Checkbox
            label="Show hp-torque graph"
            checked={config.hpTorqueGraph.show}
            onChange={() =>
              dispatch({
                type: "SET_HP_TORQUE_GRAPH",
                payload: {
                  ...config.hpTorqueGraph,
                  show: !config.hpTorqueGraph.show,
                },
              })
            }
          />

          <Checkbox
            label="Show points"
            checked={config.hpTorqueGraph.showPoints}
            onChange={() =>
              dispatch({
                type: "SET_HP_TORQUE_GRAPH",
                payload: {
                  ...config.hpTorqueGraph,
                  showPoints: !config.hpTorqueGraph.showPoints,
                },
              })
            }
          />
          <div>
            <label htmlFor="hp-height">Heigth</label>
            <Input
              id="hp-height"
              type="number"
              value={config.hpTorqueGraph.height}
              step={10}
              min={100}
              max={1000}
              onChange={(e) =>
                dispatch({
                  type: "SET_HP_TORQUE_GRAPH",
                  payload: {
                    ...config.hpTorqueGraph,
                    height: parseInt(e.target.value, 10) || 300,
                  },
                })
              }
              placeholder="Enter graph height"
            />
          </div>
        </section>
        <Divider />
        <section>
          <p>Gears</p>
          <Checkbox
            label="Show gears graph"
            checked={config.gearsGraph.show}
            onChange={() =>
              dispatch({
                type: "SET_GEARS_GRAPH",
                payload: {
                  ...config.gearsGraph,
                  show: !config.gearsGraph.show,
                },
              })
            }
          />
          <Checkbox
            label="Show points"
            checked={config.gearsGraph.showPoints}
            onChange={() =>
              dispatch({
                type: "SET_GEARS_GRAPH",
                payload: {
                  ...config.gearsGraph,
                  showPoints: !config.gearsGraph.showPoints,
                },
              })
            }
          />
          <div>
            <label htmlFor="gears-height">Heigth</label>
            <Input
              id="gears-height"
              type="number"
              value={config.gearsGraph.height}
              step={10}
              min={100}
              max={1000}
              onChange={(e) =>
                dispatch({
                  type: "SET_GEARS_GRAPH",
                  payload: {
                    ...config.gearsGraph,
                    height: parseInt(e.target.value, 10) || 300,
                  },
                })
              }
              placeholder="Enter graph height"
            />
          </div>
        </section>
        <Divider />
        <section>
          <p>Speed</p>
          <Checkbox
            label="Show speed graph"
            checked={config.speedGraph.show}
            onChange={() =>
              dispatch({
                type: "SET_SPEED_GRAPH",
                payload: {
                  ...config.speedGraph,
                  show: !config.speedGraph.show,
                },
              })
            }
          />
          <Checkbox
            label="Show points"
            checked={config.speedGraph.showPoints}
            onChange={() =>
              dispatch({
                type: "SET_SPEED_GRAPH",
                payload: {
                  ...config.speedGraph,
                  showPoints: !config.speedGraph.showPoints,
                },
              })
            }
          />
          <div>
            <label htmlFor="speed-height">Heigth</label>
            <Input
              id="speed-height"
              type="number"
              value={config.speedGraph.height}
              step={10}
              min={100}
              max={1000}
              onChange={(e) =>
                dispatch({
                  type: "SET_SPEED_GRAPH",
                  payload: {
                    ...config.speedGraph,
                    height: parseInt(e.target.value, 10) || 300,
                  },
                })
              }
              placeholder="Enter graph height"
            />
          </div>
        </section>
        <Divider />
        <section>
          <p>
            Gear Count [min: {MIN_GEARS} - max: {MAX_GEARS}]
          </p>
          <Input
            type="number"
            value={config.gearCount}
            min={MIN_GEARS}
            max={MAX_GEARS}
            onChange={(e) =>
              dispatch({
                type: "SET_GEAR_COUNT",
                payload: parseInt(e.target.value, 10) || 0,
              })
            }
            placeholder="Enter gear count"
          />
        </section>
        <Button flavor="danger" onClick={onClose} className="mt-4">
          Close
        </Button>
      </section>
    </section>,
    document.body
  );
};
