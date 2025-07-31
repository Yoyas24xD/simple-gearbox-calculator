import type { FC } from "react";
import { createPortal } from "react-dom";
import { useGlobalConfig } from "../hooks/use-global-config";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Divider } from "./ui/divider";
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <section className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          App Configuration
        </h2>
        <Divider />
        <div className="space-y-6">
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">
              HP - Torque
            </p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show HP-Torque graph</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show points</span>
              </label>
              <div>
                <label
                  htmlFor="hp-height"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Height
                </label>
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
            </div>
          </section>
          <Divider />
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">Gears</p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show gears graph</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show points</span>
              </label>
              <div>
                <label
                  htmlFor="gears-height"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Height
                </label>
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
            </div>
          </section>
          <Divider />
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">Speed</p>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show speed graph</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <Checkbox
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
                <span>Show points</span>
              </label>
              <div>
                <label
                  htmlFor="speed-height"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Height
                </label>
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
            </div>
          </section>
          <Divider />
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">
              Gear Count [min: {MIN_GEARS} - max: {MAX_GEARS}]
            </p>
            <div>
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
            </div>
          </section>
        </div>
        <Button flavor="danger" onClick={onClose} className="mt-6 w-full">
          Close
        </Button>
      </section>
    </div>,
    document.body,
  );
};
