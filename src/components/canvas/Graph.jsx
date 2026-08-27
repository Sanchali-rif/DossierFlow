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

    // Tuned D3 force simulation layout parameters
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(200) // Increased base link distance (180px - 220px)
          .strength(0.6)
      )
      .force("charge", d3.forceManyBody().strength(-500)) // Repulsion -500 for breathing room
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(50)); // 50px collide buffer

    // Edge lines
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", T.thread)
      .attr("stroke-width", 1.6)
      .attr("stroke-opacity", 0.65)
      .attr("stroke-dasharray", "4,3");

    // Edge Labels: Solid pill badges centered along the edge masking out dashed connecting lines
    const linkLabelGroup = g
      .append("g")
      .selectAll("g")
      .data(links.filter((l) => Boolean(l.label)))
      .join("g")
      .attr("pointer-events", "none");

    linkLabelGroup
      .append("rect")
      .attr("fill", T.bg) // #FAF7F2 background match
      .attr("stroke", "#D5CCC0") // crisp subtle border
      .attr("stroke-width", 1)
      .attr("rx", 4)
      .attr("ry", 4);

    linkLabelGroup
      .append("text")
      .attr("font-family", fontMono)
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("fill", "#1E1E1E") // high contrast dark neutral
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .style("font-feature-settings", '"tnum" 1')
      .text((d) => d.label || "");

    // Size label background rects dynamically to match text bounding box with 3px 8px padding
    linkLabelGroup.each(function () {
      const groupEl = d3.select(this);
      const textEl = groupEl.select("text").node();
      if (textEl) {
        const bbox = textEl.getBBox();
        const paddingX = 8;
        const paddingY = 3;
        groupEl
          .select("rect")
          .attr("x", bbox.x - paddingX)
          .attr("y", bbox.y - paddingY)
          .attr("width", bbox.width + paddingX * 2)
          .attr("height", bbox.height + paddingY * 2);
      }
    });

    // Nodes
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

    // Base Circle (layering #FAF7F2 to block obtrusive background grid bleed-through)
    node
      .append("circle")
      .attr("r", 24)
      .attr("fill", T.bg);

    // Tinted Circle with solid category border
    node
      .append("circle")
      .attr("r", 24)
      .attr("fill", (d) => getColor(d.type))
      .attr("fill-opacity", 0.18) // Soft semi-translucent category tint
      .attr("stroke", (d) => getColor(d.type)) // Crisp solid category border
      .attr("stroke-width", 2.5);

    // Node Interior Badge Initials (Solid category color token for sharp contrast)
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-family", fontMono)
      .attr("font-size", "12px")
      .attr("font-weight", "700")
      .attr("letter-spacing", "0.04em")
      .attr("fill", (d) => getColor(d.type)) // Sharp solid category color initials
      .text((d) => (d.name || "?").slice(0, 2).toUpperCase());


    // External Entity Text Labels (13px IBM Plex Sans semi-bold with #FAF7F2 text halo)
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 40) // Offset 10px below the 24px circle
      .attr("font-family", fontSans)
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .attr("fill", T.ink) // #1E1E1E
      .attr("paint-order", "stroke")
      .attr("stroke", T.bg) // #FAF7F2 background halo
      .attr("stroke-width", "5px")
      .attr("stroke-linejoin", "round")
      .text((d) => d.name);

    node.on("click", (ev, d) => onSelectEntity(d));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      linkLabelGroup.attr(
        "transform",
        (d) => `translate(${(d.source.x + d.target.x) / 2}, ${(d.source.y + d.target.y) / 2})`
      );

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
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: T.inkDim,
            marginBottom: 8,
          }}
        >
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



