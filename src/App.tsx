import { GearConfig } from "./components/gear-config";
import { InitialDataModal } from "./components/initial-data-modal";
import { LineChartMultiple } from "./components/plots/line";
import { WheelConfig } from "./components/wheel-config";
import { useHpLine } from "./hooks/use-hp-line";
import { useInitialData } from "./hooks/use-initial-data";

export const App = () => {
  const { data } = useInitialData();
  const hpLine = useHpLine(data);

  const maxHpTorque = data[hpLine.indexOf(Math.max(...hpLine))];
  console.log(maxHpTorque);

  return (
    <main>
      <InitialDataModal />
      <section className="flex gap-20 p-4 justify-center">
        <GearConfig />
        <WheelConfig />
      </section>
      <LineChartMultiple
        data={data.map((point) => ({
          key: Math.trunc(point.rpm),
          value: point.torque,
        }))}
      />
    </main>
  );
};
