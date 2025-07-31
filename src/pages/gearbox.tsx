import { useState } from "react";
import { GearConfig } from "../components/gear-config";
import { Header } from "../components/header";
import { InitialDataModal } from "../components/initial-data-modal";
import { GearsPlot } from "../components/plots/gears";
import { LineChartMultiple } from "../components/plots/line";
import { SpeedPlot } from "../components/plots/speed";
import { Divider } from "../components/ui/divider";
import { WheelConfig } from "../components/wheel-config";
import { useCarSetup } from "../hooks/use-car-setup";
import { useGlobalConfig } from "../hooks/use-global-config";
import { useHpLine } from "../hooks/use-hp-line";

export const Gearbox = () => {
  const { config } = useGlobalConfig();
  const { setup } = useCarSetup();
  const hpLine = useHpLine(setup.torqueLine);
  const [editTorqueLine, setEditTorqueLine] = useState(false);

  // zip data and hpLine
  const dataWithHp = setup.torqueLine.map((point, index) => ({
    ...point,
    hp: hpLine[index],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <section className="space-y-8 mt-8">
          <GearConfig />
          <WheelConfig />
          {config.hpTorqueGraph.show && (
            <>
              <LineChartMultiple
                style={{ height: config.hpTorqueGraph.height + "px" }}
                lines={[
                  {
                    label: "torque",
                    color: "#4a90e2",
                    data: setup.torqueLine.map((point) => ({
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
              <Divider />
            </>
          )}
          {config.gearsGraph.show && (
            <>
              <GearsPlot data={dataWithHp} />
              <Divider />
            </>
          )}
          {config.speedGraph.show && (
            <>
              <SpeedPlot />
              <Divider />
            </>
          )}
        </section>
      </div>
      <InitialDataModal
        open={editTorqueLine}
        onClose={() => setEditTorqueLine(false)}
      />
    </div>
  );
};
