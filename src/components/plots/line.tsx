import { curveMonotoneX, line as d3_line, max, scaleLinear } from "d3";
import type { CSSProperties, FC } from "react";

interface Props {
  className?: string;
  style?: CSSProperties;
  lines: {
    label: string;
    color: string;
    data: { key: number; value: number }[];
  }[];
  hidePoints?: boolean;
  xTickStep?: number;
}

const remoteDuplicates = (arr: Props["lines"][number]["data"]) => {
  const seen = new Set();
  return arr.filter((item) => {
    const key = item.value;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const LineChartMultiple: FC<Props> = ({
  lines: rawLines,
  className,
  style,
  hidePoints,
  xTickStep = 50,
}) => {
  if (rawLines[0]?.data.length === 0) {
    return null;
  }

  const lines = rawLines.map((line) => ({
    ...line,
    data: remoteDuplicates(line.data),
  }));

  const allKeys = lines.flatMap((l) => l.data.map((d) => d.key));
  const minKey = Math.min(...allKeys);
  const maxKey = Math.max(...allKeys);

  const xScale = scaleLinear().domain([minKey, maxKey]).range([0, 100]);

  const yScale = scaleLinear()
    .domain([0, max(lines.flatMap((l) => l.data.map((d) => d.value))) ?? 0])
    .range([100, 0]);

  const line = d3_line<Props["lines"][number]["data"][number]>()
    .x((d) => xScale(d.key))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const dataLines = lines.map((lineData) => line(lineData.data));

  if (dataLines.some((d) => d === null)) {
    return null;
  }

  const xTicks = xScale
    .ticks(Math.ceil((maxKey - minKey) / xTickStep)) // Calcular el número de ticks basado en el paso
    .filter(
      (tick) => tick % xTickStep === 0 || tick === minKey || tick === maxKey,
    ); // Asegurar que los ticks sean múltiplos del paso o los extremos

  return (
    <div
      style={style}
      className={`flex flex-col min-h-72 w-full ${className ?? ""}`}
    >
      {/* Leyenda - Contenedor superior */}
      <div className="flex justify-center flex-wrap gap-4 pb-2">
        {lines.map((lineData, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-1 rounded-full"
              style={{ backgroundColor: lineData.color }}
            ></div>
            <span className="text-xs text-gray-700">{lineData.label}</span>
          </div>
        ))}
      </div>

      {/* Contenedor del gráfico */}
      <div
        className="relative flex-1 w-full"
        style={
          {
            "--marginTop": "0px",
            "--marginRight": "8px",
            "--marginBottom": "25px",
            "--marginLeft": "25px",
          } as CSSProperties
        }
      >
        {/* Eje Y */}
        <div
          className="absolute inset-0
            h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            w-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible
          "
        >
          {yScale.ticks(8).map((value, i) => (
            <div
              key={i}
              style={{
                top: `${yScale(+value)}%`,
                left: "0%",
              }}
              className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-700 w-full text-right pr-2"
            >
              {value}
            </div>
          ))}
        </div>

        {/* Área del gráfico */}
        <div
          className="absolute inset-0
            h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            w-[calc(100%-var(--marginLeft)-var(--marginRight))]
            translate-x-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible
          "
        >
          <svg
            viewBox="0 0 100 100"
            className="overflow-visible w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Líneas de la cuadrícula */}
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((active, i) => (
                <g
                  transform={`translate(0,${yScale(+active)})`}
                  className="text-zinc-400"
                  key={i}
                >
                  <line
                    x1={0}
                    x2={100}
                    stroke="currentColor"
                    strokeDasharray="6,5"
                    strokeWidth={0.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            {/* Líneas del gráfico */}
            {dataLines.map((d, index) => (
              <path
                key={index}
                d={d!}
                fill="none"
                stroke={lines[index].color}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* Puntos */}
            {!hidePoints
              ? lines.flatMap((line, lineIndex) =>
                  line.data.map((d) => (
                    <path
                      key={`${lineIndex}-${d.key}`}
                      d={`M ${xScale(d.key)} ${yScale(d.value)} l 0.0001 0`}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      stroke={line.color}
                    />
                  )),
                )
              : null}
          </svg>

          {/* Eje X */}
          <div className="translate-y-2">
            {xTicks.map((value, i) => (
              <div
                key={i}
                className="absolute text-xs tabular-nums -translate-x-1/2 text-gray-500"
                style={{
                  left: `${xScale(value)}%`,
                  top: "100%",
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
