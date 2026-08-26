import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { fontMono, fontSans, T } from "../../constants/theme";
import Legend from "../ui/Legend";

export default function Graph({ entities, relations, sources, onSelectEntity }) {
  void sources;
  const svgRef = useRef(null); const wrapRef = useRef(null);
  useEffect(() => {
    const svgEl = svgRef.current, wrap = wrapRef.current; const width = wrap.clientWidth || 800, height = wrap.clientHeight || 600; const svg = d3.select(svgEl); svg.selectAll("*").remove(); svg.attr("viewBox", [0, 0, width, height]); const nodes = entities.map((e) => ({ ...e })); const links = relations.map((r) => ({ ...r, source: r.from, target: r.to }));
    if (nodes.length === 0) { svg.append("text").attr("x", width / 2).attr("y", height / 2).attr("text-anchor", "middle").attr("fill", T.inkDim).attr("font-family", fontMono).attr("font-size", "12px").text("No entities yet — add one to start building the graph"); return; }
    const g = svg.append("g"); svg.call(d3.zoom().scaleExtent([0.3, 3]).on("zoom", (ev) => g.attr("transform", ev.transform))); const color = (t) => (t === "person" ? T.amber : t === "organization" ? T.teal : T.inkDim);
    const simulation = d3.forceSimulation(nodes).force("link", d3.forceLink(links).id((d) => d.id).distance(130).strength(0.6)).force("charge", d3.forceManyBody().strength(-320)).force("center", d3.forceCenter(width / 2, height / 2)).force("collide", d3.forceCollide(46));
    const link = g.append("g").selectAll("line").data(links).join("line").attr("stroke", T.thread).attr("stroke-width", 1.4).attr("stroke-opacity", 0.55).attr("stroke-dasharray", "3,2");
    const linkLabel = g.append("g").selectAll("text").data(links).join("text").attr("font-family", fontMono).attr("font-size", "9px").attr("fill", T.inkDim).text((d) => d.label || "");
    const node = g.append("g").selectAll("g").data(nodes).join("g").attr("cursor", "grab").call(d3.drag().on("start", (ev, d) => { if (!ev.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }).on("drag", (ev, d) => { d.fx = ev.x; d.fy = ev.y; }).on("end", (ev, d) => { if (!ev.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }));
    node.append("circle").attr("r", 22).attr("fill", (d) => color(d.type)).attr("fill-opacity", 0.18).attr("stroke", (d) => color(d.type)).attr("stroke-width", 1.6); node.append("text").attr("text-anchor", "middle").attr("dy", 4).attr("font-family", fontMono).attr("font-size", "10px").attr("fill", (d) => color(d.type)).text((d) => (d.name || "?").slice(0, 2).toUpperCase()); node.append("text").attr("text-anchor", "middle").attr("dy", 38).attr("font-family", fontSans).attr("font-size", "11px").attr("fill", T.ink).text((d) => d.name); node.on("click", (ev, d) => onSelectEntity(d));
    simulation.on("tick", () => { link.attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y).attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y); linkLabel.attr("x", (d) => (d.source.x + d.target.x) / 2).attr("y", (d) => (d.source.y + d.target.y) / 2 - 4); node.attr("transform", (d) => `translate(${d.x},${d.y})`); });
    const onResize = () => { const w2 = wrap.clientWidth || width, h2 = wrap.clientHeight || height; svg.attr("viewBox", [0, 0, w2, h2]); }; window.addEventListener("resize", onResize); return () => { simulation.stop(); window.removeEventListener("resize", onResize); };
  }, [entities, relations, onSelectEntity]);
  return <div ref={wrapRef} style={{ position: "relative", width: "100%", height: "100%" }}><div style={{ position: "absolute", top: 14, right: 20, fontFamily: fontMono, fontSize: 10, color: T.inkDim, background: T.panel, border: `1px solid ${T.line}`, padding: "10px 12px", borderRadius: 3 }}><Legend color={T.amber} label="Person" /><Legend color={T.teal} label="Organization" /><Legend color={T.inkDim} label="Other" /></div><svg ref={svgRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} /><div style={{ position: "absolute", bottom: 14, left: 20, fontFamily: fontMono, fontSize: 10, color: T.inkDim }}>Drag nodes to arrange · click a node to inspect</div></div>;
}
