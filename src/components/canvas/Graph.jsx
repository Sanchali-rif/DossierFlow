import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { fontMono, fontSans, T, CategoryColors } from "../../constants/theme";
import Legend from "../ui/Legend";

export default function Graph({ entities, relations, sources, onSelectEntity }) {
  void sources;
  const svgRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const wrap = wrapRef.current;
    const width = wrap.clientWidth || 800;
    const height = wrap.clientHeight || 600;
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", [0, 0, width, height]);

    const nodes = entities.map((e) => ({ ...e }));
    const links = relations.map((r) => ({ ...r, source: r.from, target: r.to }));

    if (nodes.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", T.inkDim)
        .attr("font-family", fontMono)
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .text("No entities yet — add one to start building the graph");
      return;
    }

    const g = svg.append("g");
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.3, 3])
        .on("zoom", (ev) => g.attr("transform", ev.transform))
    );

    const getColor = (t) => {
      if (t === "person") return CategoryColors.person.main;
      if (t === "organization") return CategoryColors.organization.main;
      return CategoryColors.other.main;
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(140)
          .strength(0.6)
      )
      .force("charge", d3.forceManyBody().strength(-340))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(48));

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", T.thread)
      .attr("stroke-width", 1.6)
      .attr("stroke-opacity", 0.65)
      .attr("stroke-dasharray", "4,3");

    const linkLabel = g
      .append("g")
      .selectAll("text")
      .data(links)
      .join("text")
      .attr("font-family", fontMono)
      .attr("font-size", "10px")
      .attr("font-weight", "500")
      .attr("letter-spacing", "0.04em")
      .style("font-feature-settings", '"tnum" 1')
      .attr("fill", T.inkDim)
      .attr("paint-order", "stroke")
      .attr("stroke", T.bg)
      .attr("stroke-width", "3px")
      .text((d) => d.label || "");

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "grab")
      .call(
        d3
          .drag()
          .on("start", (ev, d) => {
            if (!ev.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (ev, d) => {
            d.fx = ev.x;
            d.fy = ev.y;
          })
          .on("end", (ev, d) => {
            if (!ev.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", 22)
      .attr("fill", (d) => getColor(d.type))
      .attr("fill-opacity", 0.16)
      .attr("stroke", (d) => getColor(d.type))
      .attr("stroke-width", 2.2);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("font-family", fontMono)
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("letter-spacing", "0.04em")
      .attr("fill", (d) => getColor(d.type))
      .text((d) => (d.name || "?").slice(0, 2).toUpperCase());

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 38)
      .attr("font-family", fontSans)
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .attr("fill", T.ink)
      .attr("paint-order", "stroke")
      .attr("stroke", T.bg)
      .attr("stroke-width", "4px")
      .text((d) => d.name);

    node.on("click", (ev, d) => onSelectEntity(d));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      linkLabel
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2 - 4);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    const onResize = () => {
      const w2 = wrap.clientWidth || width;
      const h2 = wrap.clientHeight || height;
      svg.attr("viewBox", [0, 0, w2, h2]);
    };
    window.addEventListener("resize", onResize);
    return () => {
      simulation.stop();
      window.removeEventListener("resize", onResize);
    };
  }, [entities, relations, onSelectEntity]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 20,
          fontFamily: fontMono,
          fontSize: 11,
          color: T.ink,
          background: T.panel,
          border: `1px solid ${T.line}`,
          padding: "10px 14px",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <div style={{ fontFamily: fontMono, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: T.inkDim, marginBottom: 8 }}>
          Node Categories
        </div>
        <Legend color={CategoryColors.organization.main} label="Organization" />
        <Legend color={CategoryColors.person.main} label="Person" />
        <Legend color={CategoryColors.other.main} label="Other" />
      </div>
      <svg ref={svgRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 20,
          fontFamily: fontMono,
          fontSize: 11,
          letterSpacing: "0.02em",
          color: T.inkDim,
          fontWeight: 500,
          background: "rgba(255, 255, 255, 0.85)",
          padding: "5px 10px",
          borderRadius: 4,
          border: `1px solid ${T.line}`,
        }}
      >
        Drag nodes to arrange · click a node to inspect
      </div>
    </div>
  );
}


