import { GearConfig } from "./components/gear-config";
import { InitialDataModal } from "./components/initial-data-modal";
import { TorquePlot } from "./components/plots/torque-plot";
import { WheelConfig } from "./components/wheel-config";
import { useHpLine } from "./hooks/use-hp-line";
import { useInitialData } from "./hooks/use-initial-data";

export const App = () => {
  const { data } = useInitialData();
  const hpLine = useHpLine(data);

  const maxHpTorque = data[hpLine.indexOf(Math.max(...hpLine))];
  console.log(maxHpTorque);

  const gearRpmTorque = [
    // Marcha 1
    [
      { rpm: 1000, kmh: 10, torque: 150 },
      { rpm: 2000, kmh: 20, torque: 180 },
      // ... más puntos
    ],
    // Marcha 2
    [
      { rpm: 1500, kmh: 30, torque: 140 },
      // ... más puntos
    ],
    // ... más marchas
  ];

  const tractionLine = [
    { kmh: 15, torque: 170 }, // Punto para marcha 1
    { kmh: 32, torque: 145 }, // Punto para marcha 2
    // ... más puntos
  ];

  return (
    <main>
      <InitialDataModal />
      <GearConfig />
      <WheelConfig />
      <TorquePlot gearRpmTorque={gearRpmTorque} tractionLine={tractionLine} />
    </main>
  );
};
