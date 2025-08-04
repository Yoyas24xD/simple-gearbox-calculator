import { useState, type FC } from "react";
import { GEARS_COLORS } from "../../config";
import { useCarSetup } from "../../hooks/use-car-setup";
import { computeSpeedFromRpm } from "../../hooks/use-gear-speed";
import { useGlobalConfig } from "../../hooks/use-global-config";
import { Checkbox } from "../ui/checkbox";
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
  const [lines2Show, setLines2Show] = useState(
    Array.from({ length: setup.gears.length }, () => true),
  );
  const [showTorqueLine, setShowTorqueLine] = useState(true);

  if (!maxHpTorque) {
    return null;
  }

  const lines = setup.gears.map((gear, i) => {
    if (!lines2Show[i]) {
      return { label: `Gear ${i + 1}`, color: GEARS_COLORS[i], data: [] }; // Skip if not shown
    }
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

  if (showTorqueLine) {
    lines.push({
      label: "Torque",
      color: "#FF0000",
      data: tractionLine,
    });
  }

  return (
    <section>
      <LineChartMultiple
        style={{ height: config.gearsGraph.height + "px" }}
        className={className}
        lines={
          setup.gears.every((g) => g) &&
          setup.wheel.circumference &&
          setup.finalDrive
            ? lines
            : []
        }
        xTickStep={10}
        hidePoints={!config.gearsGraph.showPoints}
      />
      <section className="flex gap-2 mt-4">
        {setup.gears.map((_, i) => (
          <Checkbox
            key={i}
            className="mt-2"
            checked={lines2Show[i]}
            onChange={(checked) => {
              const newLines2Show = [...lines2Show];
              newLines2Show[i] = checked.target.checked;
              setLines2Show(newLines2Show);
            }}
            label={`Gear ${i + 1}`}
          />
        ))}
        <Checkbox
          className="mt-2"
          checked={showTorqueLine}
          onChange={(checked) => setShowTorqueLine(checked.target.checked)}
          label="Torque Line"
        />
      </section>
    </section>
  );
};
