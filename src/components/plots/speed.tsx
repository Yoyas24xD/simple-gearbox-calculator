import { type FC } from "react";
import { useGearsSpeeds } from "../../hooks/use-gear-speed";
import { LineChartMultiple } from "./line";
import { GEARS_COLORS } from "../../config";
import { useGlobalConfig } from "../../hooks/use-global-config";

export const SpeedPlot: FC = () => {
  const speed = useGearsSpeeds();
  const { config } = useGlobalConfig();

  return (
    <LineChartMultiple
      style={{ height: config.speedGraph.height + "px" }}
      hidePoints={!config.speedGraph.showPoints}
      xTickStep={500}
      lines={speed.map((gearSpeed, index) => ({
        label: `Gear ${index + 1}`,
        color: GEARS_COLORS[index],
        data: gearSpeed.map((line) => ({ key: line.rpm, value: line.speed })),
      }))}
    />
  );
};
