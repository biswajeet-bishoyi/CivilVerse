"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Sparkles,
  Search,
  Filter,
  BrainCircuit,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Scale,
} from "lucide-react";
import { CODE_COMPARISONS, CodeComparisonClause } from "@/data/codes";

export default function CodesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Safety Factors",
    "Flexure & Compression",
    "Shear & Torsion",
    "Serviceability & Deflection",
    "Durability & Cover",
  ];

  const filteredClauses = CODE_COMPARISONS.filter((clause) => {
    const matchesCat = selectedCategory === "All" || clause.category === selectedCategory;
    const matchesSearch =
      clause.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.is456.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.aci318.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.eurocode2.rule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clause.engineeringInsight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/30 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-2.5 py-1 text-xs font-bold text-blue-300 border border-blue-800/60 font-mono mb-3">
            <Scale className="h-3.5 w-3.5 text-blue-400" /> INTERNATIONAL STANDARDS HARMONIZATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            GLOBAL CODE <span className="text-blue-400">COMPARISON MATRIX</span>
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Side-by-side clause lookup and limit state cross-comparison across{" "}
            <strong className="text-blue-300">IS 456:2000 (India)</strong>,{" "}
            <strong className="text-amber-300">ACI 318-19 (USA)</strong>, and{" "}
            <strong className="text-cyan-300">Eurocode 2 / EN 1992 (Europe)</strong>.
          </p>

          {/* Search & Category Tabs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold font-mono transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clauses, shear, cover..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {filteredClauses.map((clause) => (
          <div
            key={clause.id}
            className="rounded-2xl border border-blue-900/40 bg-[#0c1424] p-6 shadow-xl space-y-5 cad-corner group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-wider">
                  {clause.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{clause.topic}</h3>
              </div>

              <Link
                href={`/archie?prompt=Compare the differences between IS 456, ACI 318, and Eurocode 2 regarding ${clause.topic}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline self-start"
              >
                <BrainCircuit className="h-3.5 w-3.5 text-amber-300" />
                <span>Ask Archie Code Auditor →</span>
              </Link>
            </div>

            {/* 3-Column Standard Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* IS 456 */}
              <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-300">IS 456:2000 (India)</span>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-900/60 px-1.5 py-0.5 rounded">
                    {clause.is456.clause}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{clause.is456.rule}</p>
                {clause.is456.equation && (
                  <div className="rounded bg-black/60 p-2 text-[11px] font-mono text-blue-300 border border-blue-900/60">
                    $${clause.is456.equation}$$
                  </div>
                )}
              </div>

              {/* ACI 318 */}
              <div className="rounded-xl bg-amber-950/40 border border-amber-800/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300">ACI 318-19 (USA)</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-900/60 px-1.5 py-0.5 rounded">
                    {clause.aci318.clause}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{clause.aci318.rule}</p>
                {clause.aci318.equation && (
                  <div className="rounded bg-black/60 p-2 text-[11px] font-mono text-amber-300 border border-amber-900/60">
                    $${clause.aci318.equation}$$
                  </div>
                )}
              </div>

              {/* Eurocode 2 */}
              <div className="rounded-xl bg-cyan-950/40 border border-cyan-800/50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">Eurocode 2 / EN 1992 (EU)</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-900/60 px-1.5 py-0.5 rounded">
                    {clause.eurocode2.clause}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{clause.eurocode2.rule}</p>
                {clause.eurocode2.equation && (
                  <div className="rounded bg-black/60 p-2 text-[11px] font-mono text-cyan-300 border border-cyan-900/60">
                    $${clause.eurocode2.equation}$$
                  </div>
                )}
              </div>
            </div>

            {/* Practical Engineering Insight */}
            <div className="rounded-xl bg-[#080d18] border border-slate-800 p-3.5 text-xs text-slate-300">
              <strong className="text-emerald-300 font-mono">Engineering Synthesis: </strong>
              <span>{clause.engineeringInsight}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
