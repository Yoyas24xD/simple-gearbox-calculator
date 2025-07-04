import Gear from "./assets/gear.svg";
import { useState } from "react";
import { AppConfig } from "./components/app-config";
import { GearConfig } from "./components/gear-config";
import { InitialDataModal } from "./components/initial-data-modal";
import { GearsPlot } from "./components/plots/gears";
import { LineChartMultiple } from "./components/plots/line";
import { WheelConfig } from "./components/wheel-config";
import { useHpLine } from "./hooks/use-hp-line";
import { useInitialData } from "./hooks/use-initial-data";
import { Button } from "./components/ui/button";

export const App = () => {
  const [openConfig, setOpenConfig] = useState(false);
  const { data } = useInitialData();
  const hpLine = useHpLine(data);
  // zip data and hpLine
  const dataWithHp = data.map((point, index) => ({
    ...point,
    hp: hpLine[index],
  }));

  if (data.length === 0) {
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
      <Button onClick={() => setOpenConfig(true)}>
        <img src={Gear} className="w-6" />
      </Button>
      <AppConfig open={openConfig} onClose={() => setOpenConfig(false)} />
      <GearConfig />
      <WheelConfig />
      <LineChartMultiple
        lines={[
          {
            label: "torque",
            color: "#4a90e2",
            data: data.map((point) => ({
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
      />
      <GearsPlot className="h-100" data={dataWithHp} />
    </main>
  );
};
