"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ForceGraphProps, LinkData, NodeData } from "@/types";


const ForceGraph = ({ nodes, links }: ForceGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // clear previous content

    const simulation = d3
      .forceSimulation<NodeData>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeData, LinkData>(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "steelblue")
      .call(drag(simulation) as any);

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", 12)
      .attr("dx", 12)
      .attr("dy", "0.35em");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NodeData).x!)
        .attr("y1", (d) => (d.source as NodeData).y!)
        .attr("x2", (d) => (d.target as NodeData).x!)
        .attr("y2", (d) => (d.target as NodeData).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    function drag(simulation: any) {
      return d3
        .drag<SVGCircleElement, NodeData>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ForceGraph;
