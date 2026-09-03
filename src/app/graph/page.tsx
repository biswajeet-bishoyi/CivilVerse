"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Network,
  Filter,
  Search,
  Sparkles,
  Info,
  ExternalLink,
  RefreshCw,
  Building2,
  BookOpen,
  Layers,
  FileCheck2,
  Calculator,
} from "lucide-react";
import { KNOWLEDGE_GRAPH_DATA, GraphNode, GraphEdge } from "@/data/knowledge-graph";

export default function KnowledgeGraphPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(KNOWLEDGE_GRAPH_DATA.nodes[0]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Position nodes radially or in clusters for visual aesthetic
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    // Generate initial canvas coordinate layout
    const positions: Record<string, { x: number; y: number }> = {};
    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    const totalNodes = KNOWLEDGE_GRAPH_DATA.nodes.length;
    KNOWLEDGE_GRAPH_DATA.nodes.forEach((node, idx) => {
      // Cluster by category or radial angles
      const angle = (idx / totalNodes) * 2 * Math.PI;
      const radius = 140 + (idx % 3) * 60;
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    setNodePositions(positions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background Grid Lines
    ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Edges
    KNOWLEDGE_GRAPH_DATA.edges.forEach((edge) => {
      const src = nodePositions[edge.source];
      const tgt = nodePositions[edge.target];
      if (!src || !tgt) return;

      const isConnected =
        selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);
      ctx.strokeStyle = isConnected ? "#3b82f6" : "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = isConnected ? 2.5 : 1;
      ctx.stroke();

      // Draw edge relationship label if connected
      if (isConnected) {
        const midX = (src.x + tgt.x) / 2;
        const midY = (src.y + tgt.y) / 2;
        ctx.fillStyle = "#93c5fd";
        ctx.font = "9px monospace";
        ctx.fillText(edge.relation.replace("_", " "), midX - 20, midY - 4);
      }
    });

    // Draw Nodes
    KNOWLEDGE_GRAPH_DATA.nodes.forEach((node) => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      const isSelected = selectedNode?.id === node.id;

      // Color coding by category
      let fillColor = "#3b82f6"; // concept
      if (node.category === "structure") fillColor = "#38bdf8";
      if (node.category === "material") fillColor = "#10b981";
      if (node.category === "standard") fillColor = "#f59e0b";
      if (node.category === "calculator") fillColor = "#ec4899";

      // Node outer glow
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 16, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(59, 130, 246, 0.35)";
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, isSelected ? 10 : 7, 0, 2 * Math.PI);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#ffffff" : "#0f172a";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node text label
      ctx.fillStyle = isSelected ? "#ffffff" : "#cbd5e1";
      ctx.font = isSelected ? "bold 11px system-ui" : "10px system-ui";
      ctx.fillText(node.name, pos.x + 12, pos.y + 4);
    });
  }, [nodePositions, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit on any node
    for (const node of KNOWLEDGE_GRAPH_DATA.nodes) {
      const pos = nodePositions[node.id];
      if (pos) {
        const dist = Math.hypot(pos.x - clickX, pos.y - clickY);
        if (dist <= 18) {
          setSelectedNode(node);
          return;
        }
      }
    }
  };

  // Connected nodes & edges for selected
  const connectedEdges = selectedNode
    ? KNOWLEDGE_GRAPH_DATA.edges.filter(
        (e) => e.source === selectedNode.id || e.target === selectedNode.id
      )
    : [];

  const categoryIcons: Record<string, any> = {
    concept: BookOpen,
    structure: Building2,
    material: Layers,
    standard: FileCheck2,
    calculator: Calculator,
  };

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/90 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs text-cyan-300 font-mono mb-2">
            <Network className="h-3.5 w-3.5 text-cyan-400" />
            <span>INTERCONNECTED CIVIL KNOWLEDGE GRAPH</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Knowledge Graph Explorer
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Navigate the interconnected web of engineering concepts, building codes, mega-structures,
            and mathematical solvers. Click any node to inspect relationships.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Canvas Graph Viewport */}
          <div className="lg:col-span-8 rounded-2xl border border-blue-500/30 bg-[#080d18] p-4 shadow-xl cad-corner relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2 font-mono text-xs">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Concept
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-sky-400" /> Structure
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Material
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Standard
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-pink-500" /> Calculator
                </span>
              </div>
              <span className="text-slate-500">Interactive 2D Canvas</span>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={520}
              onClick={handleCanvasClick}
              className="w-full h-[480px] cursor-pointer rounded-xl bg-[#060a12] border border-slate-900"
            />
          </div>

          {/* Right Inspector Drawer */}
          <div className="lg:col-span-4 space-y-4">
            {selectedNode ? (
              <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-5 shadow-xl">
                <div>
                  <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800 uppercase">
                    {selectedNode.category} Node
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5">{selectedNode.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Connected Relationships List */}
                <div className="space-y-2 border-t border-slate-800 pt-3">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Connected Relationships ({connectedEdges.length}):
                  </div>
                  <div className="space-y-1.5">
                    {connectedEdges.map((edge, idx) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = KNOWLEDGE_GRAPH_DATA.nodes.find((n) => n.id === otherId);

                      return (
                        <button
                          key={idx}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="w-full text-left rounded-lg bg-slate-900/80 hover:bg-blue-950/40 p-2 border border-slate-800 text-xs flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <span className="text-[10px] text-blue-400 font-mono">
                              {edge.relation.replace("_", " ")} →
                            </span>
                            <div className="text-white font-medium group-hover:text-blue-300">
                              {otherNode?.name}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {otherNode?.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2">
                  <Link
                    href={selectedNode.linkUrl}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition-all font-mono"
                  >
                    <span>Open Module Page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={`/archie?prompt=${encodeURIComponent(`Explain how ${selectedNode.name} fits into the civil engineering knowledge graph and its related concepts.`)}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 py-2 text-xs font-mono text-blue-400 border border-slate-800 transition-all"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>Ask Archie about this Node</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-8 text-center text-slate-400 text-xs">
                Select a node on the canvas to inspect its relationships.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
