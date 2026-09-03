"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Search,
  Layers,
  Scale,
  Building2,
  BrainCircuit,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Sliders,
  Activity,
} from "lucide-react";
import { dataEngine, EngineeringDiscipline, FormulaRecord } from "@/lib/data-engine";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"formulas" | "marvels" | "codes" | "materials">("formulas");
  const [selectedDiscipline, setSelectedDiscipline] = useState<EngineeringDiscipline | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination for Formulas
  const [formulaPage, setFormulaPage] = useState(1);
  const formulaLimit = 6;

  const disciplines: (EngineeringDiscipline | "All")[] = [
    "All",
    "Structural Mechanics",
    "Geotechnical Engineering",
    "Hydraulics & Fluid Mechanics",
    "Concrete Technology & RCC",
    "Transportation & Highway",
    "Environmental & Water Resources",
  ];

  // Queries via Data Engine
  const formulasResult = dataEngine.queryFormulas({
    page: formulaPage,
    limit: formulaLimit,
    discipline: selectedDiscipline,
    search: searchQuery,
  });

  const marvelsResult = dataEngine.queryMarvels({
    search: searchQuery,
    limit: 6,
  });

  const materialsResult = dataEngine.queryMaterials({
    search: searchQuery,
    limit: 6,
  });

  const codesResult = dataEngine.queryCodes({
    search: searchQuery,
    limit: 6,
  });

  const copyFormula = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/30 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-2.5 py-1 text-xs font-bold text-blue-300 border border-blue-800/60 font-mono mb-3">
                <BookOpen className="h-3.5 w-3.5 text-blue-400" /> CENTRALIZED ENGINEERING REPOSITORY
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                CIVIL<span className="text-blue-400">VERSE</span> DATA LIBRARY
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Decoupled knowledge repository indexing over 100+ formulas, global megastructures, material constitutive models, and international design codes.
              </p>
            </div>

            <Link
              href="/archie?prompt=Search the CivilVerse Data Library for the governing design equations for a deep cantilever beam."
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/20 font-mono self-start"
            >
              <BrainCircuit className="h-4 w-4 text-amber-300" />
              <span>Query via Archie AI →</span>
            </Link>
          </div>

          {/* Library Tab Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab("formulas");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  activeTab === "formulas"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <Calculator className="h-3.5 w-3.5 text-blue-300" />
                <span>Formulas Codex ({formulasResult.totalCount})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("marvels");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  activeTab === "marvels"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <Building2 className="h-3.5 w-3.5 text-amber-300" />
                <span>Megastructures ({marvelsResult.totalCount})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("codes");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  activeTab === "codes"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <Scale className="h-3.5 w-3.5 text-indigo-300" />
                <span>Design Codes ({codesResult.totalCount})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("materials");
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold font-mono transition-all ${
                  activeTab === "materials"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-emerald-300" />
                <span>Materials Matrix ({materialsResult.totalCount})</span>
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFormulaPage(1);
                }}
                placeholder={`Search ${activeTab}...`}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* ========================================================= */}
        {/* TAB 1: FORMULAS CODEX */}
        {/* ========================================================= */}
        {activeTab === "formulas" && (
          <div className="space-y-6">
            {/* Discipline Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#080d18] p-2 rounded-2xl border border-slate-800">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDiscipline(d);
                    setFormulaPage(1);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                    selectedDiscipline === d
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {formulasResult.data.length === 0 ? (
              <div className="py-16 text-center text-slate-400 font-mono text-sm">
                No formulas matching "{searchQuery}". Try searching by variable (e.g. "M", "P_cr", "v_s") or topic.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formulasResult.data.map((formula) => (
                  <div
                    key={formula.id}
                    className="rounded-2xl border border-blue-900/40 bg-[#0c1424] p-6 shadow-xl space-y-4 cad-corner flex flex-col justify-between group hover:border-blue-500/50 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-300 border border-blue-800/60 uppercase">
                          {formula.discipline}
                        </span>
                        {formula.standardCodeReference && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {formula.standardCodeReference}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {formula.name}
                      </h3>

                      {/* LaTeX Display Block */}
                      <div className="rounded-xl bg-black/80 border border-blue-900/60 p-4 text-center text-cyan-300 font-mono text-sm overflow-x-auto relative">
                        <div className="py-2">
                          $${formula.latexEquation}$$
                        </div>
                        <button
                          onClick={() => copyFormula(formula.latexEquation, formula.id)}
                          className="absolute top-2 right-2 p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[10px] font-mono flex items-center gap-1 transition-colors"
                          title="Copy LaTeX"
                        >
                          {copiedId === formula.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> LaTeX
                            </>
                          )}
                        </button>
                      </div>

                      {/* Parameters Table */}
                      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 space-y-1.5 text-xs">
                        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                          Parameters & Definitions:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {formula.parameters.map((param, idx) => (
                            <div key={idx} className="flex items-baseline gap-1.5 text-slate-300">
                              <span className="font-mono font-bold text-amber-300">{param.symbol}:</span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">{param.name} ({param.unit})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-slate-400 font-mono">Application: </strong>
                        {formula.practicalApplication}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 text-[11px]">{formula.governingLaw}</span>
                      <Link
                        href={`/archie?prompt=Explain the derivation and load cases for ${formula.name} (${formula.plainFormula})`}
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold"
                      >
                        <Sparkles className="h-3 w-3 text-amber-300" />
                        <span>Derive with Archie →</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {formulasResult.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono">
                <span className="text-slate-400">
                  Page {formulasResult.page} of {formulasResult.totalPages} ({formulasResult.totalCount} total formulas)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFormulaPage((p) => Math.max(p - 1, 1))}
                    disabled={!formulasResult.hasPrevPage}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-slate-300 hover:text-white disabled:opacity-40 border border-slate-800 flex items-center gap-1"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Prev
                  </button>
                  <button
                    onClick={() => setFormulaPage((p) => Math.min(p + 1, formulasResult.totalPages))}
                    disabled={!formulasResult.hasNextPage}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-slate-300 hover:text-white disabled:opacity-40 border border-slate-800 flex items-center gap-1"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MEGASTRUCTURES DATABASE */}
        {/* ========================================================= */}
        {activeTab === "marvels" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marvelsResult.data.map((m) => (
                <Link
                  key={m.id}
                  href={`/marvels/${m.slug}`}
                  className="rounded-2xl border border-blue-900/40 bg-[#0c1424] overflow-hidden shadow-xl hover:border-blue-500/60 hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={m.heroImage}
                      alt={m.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded bg-blue-950/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800">
                      {m.category}
                    </span>
                    <span className="absolute top-3 right-3 rounded bg-slate-900/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-800">
                      {m.country}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-blue-400 font-mono">
                      System: {m.structuralSystem}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  <div className="px-5 pb-4 pt-2 border-t border-slate-800 text-xs font-mono text-blue-400 flex items-center justify-between">
                    <span>Year: {m.completionYear}</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Case Study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DESIGN CODES */}
        {/* ========================================================= */}
        {activeTab === "codes" && (
          <div className="space-y-4">
            {codesResult.data.map((code) => (
              <div
                key={code.id}
                className="rounded-2xl border border-slate-800 bg-[#0c1424] p-5 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{code.topic}</h3>
                  <span className="text-[10px] font-mono text-blue-400 uppercase bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                    {code.category}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <strong className="text-blue-300 font-mono">IS 456 ({code.is456.clause}): </strong>
                    <p className="text-slate-300 mt-1">{code.is456.rule}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-300 font-mono">ACI 318 ({code.aci318.clause}): </strong>
                    <p className="text-slate-300 mt-1">{code.aci318.rule}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <strong className="text-cyan-300 font-mono">Eurocode 2 ({code.eurocode2.clause}): </strong>
                    <p className="text-slate-300 mt-1">{code.eurocode2.rule}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MATERIALS MATRIX */}
        {/* ========================================================= */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialsResult.data.map((mat) => (
              <div
                key={mat.id}
                className="rounded-2xl border border-slate-800 bg-[#0c1424] p-5 shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                      {mat.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{mat.standardCode}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{mat.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{mat.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Elastic Modulus (E)</span>
                    <span className="font-bold text-blue-300">{mat.modulusOfElasticity} GPa</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Peak Strength</span>
                    <span className="font-bold text-amber-300">{mat.stressStrainCurve.peakStress} MPa</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
