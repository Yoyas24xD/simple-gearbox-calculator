import { curveMonotoneX, line as d3_line, max, scaleLinear } from "d3";
import type { CSSProperties, FC } from "react";

interface Props {
  lines: {data:{ key: number; value: number }[]};
}

export const LineChartMultiple: FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  const xScale = scaleLinear()
    .domain([data[0].key, data[data.length - 1].key])
    .range([0, 100]);

  const yScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  const line = d3_line<(typeof data)[number]>()
    .x((d) => xScale(d.key))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const d = line(data);
  // let d2 = line(data2);

  if (!d) {
    return null;
  }

  const drawXAxis = () => {
    const numTicks = 20; // Número deseado de etiquetas
    // Calcular índices equiespaciados
    let indicesToShow: number[] = [];
    if (data.length <= numTicks) {
      indicesToShow = data.map((_, i) => i);
    } else {
      indicesToShow = Array.from({ length: numTicks }, (_, i) =>
        Math.round((i * (data.length - 1)) / (numTicks - 1))
      );
    }

    return indicesToShow.map((index) => {
      const dataPoint = data[index];
      const isFirst = index === 0;
      const isLast = index === data.length - 1;

      return (
        <div key={index} className="overflow-visible text-zinc-500">
          <div
            style={{
              left: `${xScale(dataPoint.key)}%`,
              top: "100%",
              transform: `translateX(${
                isFirst ? "0%" : isLast ? "-100%" : "-50%"
              })`,
            }}
            className="text-xs absolute"
          >
            {dataPoint.key}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="relative h-72 w-full"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* Y axis */}
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
            className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
          >
            {value}
          </div>
        ))}
      </div>

      {/* Chart area */}
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
          {/* Grid lines */}
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className="text-zinc-300 dark:text-zinc-700"
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
          {/* Line */}
          <path
            d={d}
            fill="none"
            className="stroke-violet-400"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Line 2 */}
          {/* <path
            d={d2}
            fill="none"
            className="stroke-fuchsia-400"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          /> */}

          {/* Circles 1  */}
          {data.map((d, index) => (
            <path
              key={index}
              d={`M ${xScale(d.key)} ${yScale(d.value)} l 0.0001 0`}
              vectorEffect="non-scaling-stroke"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              stroke="currentColor"
              className="text-violet-300"
            />
          ))}
          {/* Circles 2 */}
          {/* {data2.map((d, index) => (
            <path
              key={index}
              d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
              vectorEffect="non-scaling-stroke"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              stroke="currentColor"
              className="text-fuchsia-300"
            />
          ))} */}
        </svg>

        <div className="translate-y-2">
          {/* X Axis */}
          {drawXAxis()}
        </div>
      </div>
    </div>
  );
};
