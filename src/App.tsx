import { GearConfig } from "./components/gear-config";
import { InitialDataModal } from "./components/initial-data-modal";
import { GearsPlot } from "./components/plots/gears";
import { LineChartMultiple } from "./components/plots/line";
import { WheelConfig } from "./components/wheel-config";
import { useHpLine } from "./hooks/use-hp-line";
import { useInitialData } from "./hooks/use-initial-data";

export const App = () => {
  const { data } = useInitialData();
  const hpLine = useHpLine(data);
  // zip data and hpLine
  const dataWithHp = data.map((point, index) => ({
    ...point,
    hp: hpLine[index],
  }));

  return (
    <main className="p-2">
      <InitialDataModal />
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
      />
      <GearsPlot data={dataWithHp} />
    </main>
  );
};
