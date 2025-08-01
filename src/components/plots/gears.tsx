import type { FC } from "react";
import { GEARS_COLORS } from "../../config";
import { useCarSetup } from "../../hooks/use-car-setup";
import { computeSpeedFromRpm } from "../../hooks/use-gear-speed";
import { useGlobalConfig } from "../../hooks/use-global-config";
import { LineChartMultiple } from "./line";

interface Props {
  data: { hp: number; rpm: number; torque: number }[];
  className?: string;
}

export const GearsPlot: FC<Props> = ({ data, className }) => {
  const { config } = useGlobalConfig();
  const { setup } = useCarSetup();
  const maxHp = Math.max(...data.map((d) => d.hp));
  const maxHpTorque = data.find((d) => d.hp === maxHp);
  if (!maxHpTorque) {
    return null;
  }

  const lines = setup.gears.map((gear, i) => {
    const gearData = data.map((d) => ({
      key: Math.trunc(
        computeSpeedFromRpm(
          d.rpm,
          setup.wheel.circumference,
          gear,
          setup.finalDrive,
        ),
      ),
      value: d.torque * gear * setup.finalDrive,
    }));
    return {
      label: `Gear ${i + 1}`,
      color: GEARS_COLORS[i],
      data: gearData,
    };
  });

  const tractionLine = setup.gears.map((gear) => {
    const tractionSpeed = computeSpeedFromRpm(
      maxHpTorque.rpm,
      setup.wheel.circumference,
      gear,
      setup.finalDrive,
    );
    return {
      key: Math.trunc(tractionSpeed),
      value: maxHpTorque.torque * gear * setup.finalDrive,
    };
  });

  return (
    <LineChartMultiple
      style={{ height: config.gearsGraph.height + "px" }}
      className={className}
      lines={
        setup.gears.every((g) => g) &&
        setup.wheel.circumference &&
        setup.finalDrive
          ? [
              ...lines,
              {
                label: "Traction",
                color: "#F00",
                data: tractionLine,
              },
            ]
          : []
      }
      xTickStep={10}
      hidePoints={!config.gearsGraph.showPoints}
    />
  );
};
