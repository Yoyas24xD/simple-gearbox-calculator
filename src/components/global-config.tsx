import { useEffect, type FC } from "react";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <section
        className="bg-white p-8 rounded-xl shadow-2xl w-full text-center max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          App Configuration
        </h2>
        <Divider />
        <div className="space-y-6">
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">
              Specific Graph Controls
            </p>
            <div className="space-y-4">
              {/* HP - Torque */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Torque Graph</span>
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
                  <span>Show</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700 text-sm">
                  <Checkbox
                    checked={config.hpTorqueGraph.showPoints}
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
                  <span>Dots</span>
                </label>
              </div>
              {/* Gears */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Gears Graph</span>
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
                  <span>Show</span>
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
                  <span>Dots</span>
                </label>
              </div>
              {/* Speed */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Speed Graph</span>
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
                  <span>Show</span>
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
                  <span>Dots</span>
                </label>
              </div>
            </div>
          </section>
          <Divider />
          <section>
            <p className="font-semibold text-gray-800 text-lg mb-2">
              Number of Gears
            </p>
            <div>
              <label
                htmlFor="gear-count"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gear Count [min: {MIN_GEARS} - max: {MAX_GEARS}]
              </label>
              <Input
                id="gear-count"
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
