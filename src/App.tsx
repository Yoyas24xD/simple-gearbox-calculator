import { useState } from "react";
import Gear from "./assets/gear.svg";
import { GearConfig } from "./components/gear-config";
import { GlobalConfig } from "./components/global-config";
import { InitialDataModal } from "./components/initial-data-modal";
import { GearsPlot } from "./components/plots/gears";
import { LineChartMultiple } from "./components/plots/line";
import { Autocomplete } from "./components/ui/autocomplete";
import { Button } from "./components/ui/button";
import { WheelConfig } from "./components/wheel-config";
import { useCarSetup, type CarSetup } from "./hooks/use-car-setup";
import { useGlobalConfig } from "./hooks/use-global-config";
import { useHpLine } from "./hooks/use-hp-line";
import { useIndexedDB } from "./hooks/use-storage";

export const App = () => {
  const { config } = useGlobalConfig();
  const [openConfig, setOpenConfig] = useState(false);
  const { setup, setSetup, persistSetup, loadSetup } = useCarSetup();
  const hpLine = useHpLine(setup.data);
  const storage = useIndexedDB<CarSetup>(setup.name);

  // zip data and hpLine
  const dataWithHp = setup.data.map((point, index) => ({
    ...point,
    hp: hpLine[index],
  }));

  if (setup.data.length === 0) {
    return (
      <main className="p-2">
        <InitialDataModal />
        <div className="text-center text-gray-500">
          Please enter RPM and torque data to start.
        </div>
      </main>
    );
  }

  return (
    <main className="p-2">
      <header>
        <Autocomplete
          items={
            storage.keys().map((key) => ({
              id: key,
              label: key,
              value: key,
            })) || []
          }
          listId="setup"
          onSelect={(item) => {
            if (!item) return;
            setSetup({
              type: "UPDATE_SETUP_NAME",
              setup: storage.value?.find((s) => s.name === item.value) || setup,
            });
          }}
        />
        <Button flavor="primary" onClick={persistSetup} className="ml-2">
          Save Setup
        </Button>
      </header>
      <Button onClick={() => setOpenConfig(true)}>
        <img src={Gear} className="w-6" alt="config" />
      </Button>
      <GlobalConfig open={openConfig} onClose={() => setOpenConfig(false)} />
      <GearConfig />
      <WheelConfig />
      {config.hpTorqueGraph.show && (
        <LineChartMultiple
          style={{ height: config.hpTorqueGraph.height + "px" }}
          lines={[
            {
              label: "torque",
              color: "#4a90e2",
              data: setup.data.map((point) => ({
                key: Math.trunc(point.rpm),
                value: point.torque,
              })),
            },
            {
              label: "hp",
              color: "#e94e77",
              data: dataWithHp.map((point) => ({
                key: Math.trunc(point.rpm),
                value: point.hp,
              })),
            },
          ]}
          xTickStep={125}
          hidePoints={!config.hpTorqueGraph.showPoints}
        />
      )}
      {config.gearsGraph.show && (
        <GearsPlot
          style={{ height: config.gearsGraph.height + "px" }}
          data={dataWithHp}
        />
      )}
    </main>
  );
};
