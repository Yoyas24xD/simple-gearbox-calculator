import type { FC } from "react";
import { useGears } from "../../hooks/use-gears";
import { LineChartMultiple } from "./line";
import { computeSpeedFromRpm } from "../../hooks/use-gear-speed";

interface Props {
  data: { hp: number; rpm: number; torque: number }[];
}

export const GearsPlot: FC<Props> = ({ data }) => {
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
      color: `hsl(${(gear / gears.length) * 360}, 100%, 50%)`,
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
  console.log("tractionLine", tractionLine);

  lines.push({
    label: "Traction",
    color: "#e94e77",
    data: tractionLine,
  });

  return <LineChartMultiple lines={lines} />;
};
