import { GearConfig } from "./components/gear-config";
import { Header } from "./components/header";
import { InitialDataModal } from "./components/initial-data-modal";
import { GearsPlot } from "./components/plots/gears";
import { LineChartMultiple } from "./components/plots/line";
import { WheelConfig } from "./components/wheel-config";
import { useCarSetup } from "./hooks/use-car-setup";
import { useGlobalConfig } from "./hooks/use-global-config";
import { useHpLine } from "./hooks/use-hp-line";

export const App = () => {
  const { config } = useGlobalConfig();
  const { setup } = useCarSetup();
  const hpLine = useHpLine(setup.data);

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
    <main>
      <Header />
      <section className="p-2">
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
      </section>
    </main>
  );
};
