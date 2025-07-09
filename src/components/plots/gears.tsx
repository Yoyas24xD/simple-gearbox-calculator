import type { CSSProperties, FC } from "react";
import { useGears } from "../../hooks/use-gears";
import { LineChartMultiple } from "./line";
import { computeSpeedFromRpm } from "../../hooks/use-gear-speed";
import { useGlobalConfig } from "../../hooks/use-global-config";

interface Props {
  data: { hp: number; rpm: number; torque: number }[];
  className?: string;
  style?: CSSProperties;
}

const GEARS_COLORS = [
  "#4a90e2", // blue
  "#e94e77", // pink
  "#50e3c2", // teal
  "#f5a623", // orange
  "#b8e986", // light green
  "#9013fe", // purple
  "#f8e71c", // yellow
  "#7ed321", // green
];

export const GearsPlot: FC<Props> = ({ data, className, style }) => {
  const { config } = useGlobalConfig();
  const { gears, wheelCircumference, finalDrive } = useGears();
  const maxHp = Math.max(...data.map((d) => d.hp));
  const maxHpTorque = data.find((d) => d.hp === maxHp);
  if (!maxHpTorque) {
    return null;
  }

  const lines = gears.map((gear, i) => {
    const gearData = data.map((d) => ({
      key: Math.trunc(
        computeSpeedFromRpm(d.rpm, wheelCircumference, gear, finalDrive)
      ),
      value: d.torque * gear * finalDrive,
    }));
    return {
      label: `Gear ${i + 1}`,
      color: GEARS_COLORS[i],
      data: gearData,
    };
  });

  const tractionLine = gears.map((gear) => {
    const tractionSpeed = computeSpeedFromRpm(
      maxHpTorque.rpm,
      wheelCircumference,
      gear,
      finalDrive
    );
    return {
      key: Math.trunc(tractionSpeed),
      value: maxHpTorque.torque * gear * finalDrive,
    };
  });

  return (
    <LineChartMultiple
      style={style}
      className={className}
      lines={
        gears.every((g) => g)
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
