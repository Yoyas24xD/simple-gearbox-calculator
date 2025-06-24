import { useRef, useEffect, type FC } from "react";
import * as d3 from "d3";

interface Props {
  gearRpmTorque: { kmh: number; torque: number }[][];
  tractionLine: { kmh: number; torque: number }[];
}

export const TorquePlot: FC<Props> = ({ gearRpmTorque, tractionLine }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!gearRpmTorque || !tractionLine) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 100, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Limpiar SVG previo
    svg.selectAll("*").remove();

    // Crear contenedor principal
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(gearRpmTorque.flatMap((gear) => gear.map((d) => d.kmh))) ?? 0,
      ])
      .range([0, innerWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        (d3.max(gearRpmTorque.flatMap((gear) => gear.map((d) => d.torque))) ??
          0) * 1.1,
      ])
      .range([innerHeight, 0])
      .nice();

    // Ejes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .text("km/h");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .text("Torque (Nm)");

    // Cuadrícula
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(null))
      .selectAll("line")
      .attr("stroke", "lightgray");

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(null))
      .selectAll("line")
      .attr("stroke", "lightgray");

    // Colores para las marchas
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Líneas por marcha
    gearRpmTorque.forEach((gearData, i) => {
      const line = d3
        .line<{ kmh: number; torque: number }>()
        .x((d) => xScale(d.kmh))
        .y((d) => yScale(d.torque));

      g.append("path")
        .datum(gearData)
        .attr("d", line)
        .attr("fill", "none")
        // .attr("stroke", color(i))
        .attr("stroke-width", 2)
        .attr("opacity", 0.7)
        .attr("class", `gear-${i}`);
    });

    // Línea de tracción
    const tractionLineGen = d3
      .line<{
        kmh: number;
        torque: number;
      }>()
      .x((d) => xScale(d.kmh))
      .y((d) => yScale(d.torque));

    g.append("path")
      .datum(tractionLine)
      .attr("d", tractionLineGen)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("opacity", 0.7);

    // Leyenda
    const legend = g
      .append("g")
      .attr("transform", `translate(${innerWidth + 20}, 0)`);

    gearRpmTorque.forEach((_, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 25})`);

      legendRow
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        // .attr("fill", color(i))
        .attr("opacity", 0.7);

      legendRow
        .append("text")
        .attr("x", 20)
        .attr("y", 12)
        .text(`Gear ${i + 1}`)
        .attr("font-size", "12px");
    });

    // Leyenda para línea de tracción
    const tractionLegend = legend
      .append("g")
      .attr("transform", `translate(0, ${gearRpmTorque.length * 25})`);

    tractionLegend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 15)
      .attr("y1", 7.5)
      .attr("y2", 7.5)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    tractionLegend
      .append("text")
      .attr("x", 20)
      .attr("y", 7.5)
      .attr("dy", "0.35em")
      .text("Traction Line")
      .attr("font-size", "12px");

    // Título
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .text("Torque por Marcha");
  }, [gearRpmTorque, tractionLine]);

  return <svg ref={svgRef}></svg>;
};
