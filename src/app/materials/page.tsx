"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Activity,
  Leaf,
  Scale,
  Flame,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  BrainCircuit,
  Sliders,
} from "lucide-react";
import { MATERIALS_DATA, EngineeringMaterial } from "@/data/materials";

export default function MaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<EngineeringMaterial>(MATERIALS_DATA[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Concrete", "Steel Reinforcement", "Composites & Advanced", "Timber & Masonry"];

  const filteredMaterials = MATERIALS_DATA.filter((mat) => {
    const matchesCat = selectedCategory === "All" || mat.category === selectedCategory;
    const matchesSearch =
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.standardCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/30 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-2.5 py-1 text-xs font-bold text-blue-300 border border-blue-800/60 font-mono mb-3">
            <Layers className="h-3.5 w-3.5 text-blue-400" /> MATERIALS SCIENCE & CONSTITUTIVE LAWS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
            CIVIL ENGINEERING <span className="text-blue-400">MATERIALS DATABASE</span>
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Interactive constitutive stress-strain relationships, mechanical elasticity modulus ($E$), Poisson's ratios, and embodied carbon indices for 10+ modern infrastructure materials.
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
                placeholder="Search materials, codes, UHPC..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Materials Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Material ({filteredMaterials.length} Available)
            </div>

            {filteredMaterials.map((mat) => {
              const isSelected = selectedMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full text-left rounded-2xl p-4 border transition-all ${
                    isSelected
                      ? "bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-500/10"
                      : "bg-[#0c1424] border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-blue-400 font-bold">{mat.standardCode}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        mat.ductilityClass === "High"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : mat.ductilityClass === "Medium"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      Ductility: {mat.ductilityClass}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{mat.name}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>E = {mat.modulusOfElasticity} GPa</span>
                    <span>ρ = {mat.density} kg/m³</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Deep Material Inspector & Stress-Strain Curve */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 sm:p-8 shadow-2xl space-y-6 cad-corner">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase font-bold">
                    {selectedMaterial.category} • {selectedMaterial.standardCode}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    {selectedMaterial.name}
                  </h2>
                </div>

                <Link
                  href={`/archie?prompt=Can you explain the constitutive behavior and failure criteria of ${selectedMaterial.name}?`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 px-3 py-1.5 text-xs font-mono text-blue-300 transition-colors self-start"
                >
                  <BrainCircuit className="h-3.5 w-3.5 text-amber-300" />
                  <span>Ask Archie →</span>
                </Link>
              </div>

              {/* Stress-Strain SVG Graph */}
              <div className="rounded-2xl bg-black/70 border border-blue-900/60 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Activity className="h-4 w-4" /> CONSTITUTIVE STRESS-STRAIN MODEL (σ - ε)
                  </span>
                  <span className="text-slate-400">Peak Stress: {selectedMaterial.stressStrainCurve.peakStress} MPa</span>
                </div>

                <div className="relative h-48 w-full">
                  <svg viewBox="0 0 500 200" className="h-full w-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="40" y2="170" stroke="#1e293b" strokeWidth="1" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#1e293b" strokeWidth="1" />
                    <line x1="40" y1="95" x2="480" y2="95" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.8" />

                    {/* Axis Labels */}
                    <text x="10" y="95" fill="#94a3b8" fontSize="10" fontFamily="monospace">σ (MPa)</text>
                    <text x="440" y="190" fill="#94a3b8" fontSize="10" fontFamily="monospace">ε (Strain)</text>

                    {/* Stress Strain Curve based on material type */}
                    {selectedMaterial.stressStrainCurve.type === "parabolic-linear" && (
                      <path
                        d="M 40 170 Q 200 40, 260 40 L 420 70"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    )}
                    {selectedMaterial.stressStrainCurve.type === "elastic-plastic" && (
                      <path
                        d="M 40 170 L 140 45 Q 220 35, 450 35"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    )}
                    {selectedMaterial.stressStrainCurve.type === "linear-brittle" && (
                      <path
                        d="M 40 170 L 380 30"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Peak Point Indicator */}
                    <circle cx="260" cy="40" r="4" fill="#facc15" />
                    <text x="270" y="38" fill="#facc15" fontSize="10" fontFamily="monospace">
                      f_max = {selectedMaterial.stressStrainCurve.peakStress} MPa
                    </text>
                  </svg>
                </div>
                <p className="text-[11px] text-slate-400 font-mono text-center">
                  Model: {selectedMaterial.stressStrainCurve.type.toUpperCase()} • Yield ε = {selectedMaterial.stressStrainCurve.yieldStrain} • Ult ε = {selectedMaterial.stressStrainCurve.ultimateStrain}
                </p>
              </div>

              {/* Physical Property Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Elastic Modulus (E)</div>
                  <div className="text-lg font-extrabold text-blue-300 font-mono mt-0.5">
                    {selectedMaterial.modulusOfElasticity} <span className="text-xs font-normal">GPa</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Density (ρ)</div>
                  <div className="text-lg font-extrabold text-amber-300 font-mono mt-0.5">
                    {selectedMaterial.density} <span className="text-xs font-normal">kg/m³</span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Poisson's Ratio (ν)</div>
                  <div className="text-lg font-extrabold text-cyan-300 font-mono mt-0.5">
                    {selectedMaterial.poissonsRatio}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Carbon Intensity</div>
                  <div className="text-sm font-extrabold text-emerald-300 font-mono mt-1">
                    {selectedMaterial.embodiedCarbon}
                  </div>
                </div>
              </div>

              {/* Description & Applications */}
              <div className="space-y-4">
                <div className="rounded-xl bg-blue-950/30 border border-blue-900/40 p-4 text-xs text-slate-200 leading-relaxed">
                  <strong className="text-blue-300 font-mono uppercase block mb-1">Engineering Overview:</strong>
                  {selectedMaterial.description}
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                    Primary Infrastructure Applications:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMaterial.primaryApplications.map((app, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-slate-900/60 border border-slate-800 px-3 py-2 text-xs text-slate-300 flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
