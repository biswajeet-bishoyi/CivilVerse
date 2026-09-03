"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Compass,
  Calculator,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  ChevronRight,
  Search,
  BookOpen,
} from "lucide-react";
import { MARVELS_DATA } from "@/data/marvels";
import { CONCEPTS_DATA } from "@/data/concepts";
import { COURSES_DATA } from "@/data/courses";
import { NEWS_DATA } from "@/data/news";

export default function HomePage() {
  // Quick calculator mini widget state
  const [beamLength, setBeamLength] = useState<number>(6);
  const [pointLoad, setPointLoad] = useState<number>(30);
  const [rebarDia, setRebarDia] = useState<number>(16);

  // Quick calculations
  const maxMomentSS = (pointLoad * beamLength) / 4; // kNm
  const maxShearSS = pointLoad / 2; // kN
  const rebarWeightPerM = (rebarDia * rebarDia) / 162; // kg/m (D^2 / 162)

  return (
    <div className="relative min-h-screen bg-blueprint-pattern pb-20">
      {/* Background CAD Lines Accent */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-lines bg-grid-lg opacity-40" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-blue-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3.5 py-1 text-xs text-blue-300 backdrop-blur-sm shadow-sm font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                <span>AI-FIRST CIVIL ENGINEERING PLATFORM</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                One Universe. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  Every Structure.
                </span>{" "}
                <br />
                Every Engineer.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                CivilVerse fuses an engineering encyclopedia, interactive calculators,
                learning modules, and <strong>Archie AI with Engineering X-Ray</strong> into
                the world's most comprehensive civil engineering destination.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/archie"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 transition-all border border-blue-400/30 hover:scale-[1.02]"
                >
                  <BrainCircuit className="h-4 w-4 text-amber-300" />
                  <span>Launch Archie AI & X-Ray</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/calculators"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-blue-500/50 hover:bg-slate-800 transition-all hover:text-white"
                >
                  <Calculator className="h-4 w-4 text-blue-400" />
                  <span>Engineering Calculators</span>
                </Link>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg font-mono">
                <div>
                  <div className="text-2xl font-bold text-white">828 m</div>
                  <div className="text-xs text-slate-400">Peak Supertall Height</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-xs text-slate-400">IS / ACI / Eurocode Ready</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">6+ Tools</div>
                  <div className="text-xs text-slate-400">Live Solvers & SFD/BMD</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Blueprint Visualizer */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-blue-500/30 bg-[#0c1424]/90 p-6 shadow-2xl backdrop-blur-md cad-corner">
                {/* Header tag */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Sliders className="h-3.5 w-3.5" />
                    <span className="font-bold">LIVE BLUEPRINT ENGINE</span>
                  </div>
                  <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded text-blue-300 border border-blue-800">
                    SIMULATION MODE
                  </span>
                </div>

                {/* Interactive Beam Test */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Span Length (L):</span>
                      <span className="font-mono text-blue-400">{beamLength} meters</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="16"
                      step="1"
                      value={beamLength}
                      onChange={(e) => setBeamLength(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Point Load at Midspan (P):</span>
                      <span className="font-mono text-amber-400">{pointLoad} kN</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={pointLoad}
                      onChange={(e) => setPointLoad(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800"
                    />
                  </div>

                  {/* Visual Beam SVG Canvas */}
                  <div className="rounded-lg bg-[#060a12] p-3 border border-slate-800/80">
                    <div className="text-[10px] text-slate-500 font-mono mb-1">
                      DIAGRAM: SIMPLY SUPPORTED BEAM
                    </div>
                    <svg viewBox="0 0 300 80" className="w-full h-20">
                      {/* Grid background */}
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="300" height="80" fill="url(#grid)" />

                      {/* Beam Line */}
                      <rect x="30" y="38" width="240" height="8" rx="2" fill="#3b82f6" />

                      {/* Supports */}
                      <polygon points="30,46 20,62 40,62" fill="#64748b" />
                      <circle cx="270" cy="54" r="6" fill="#64748b" />

                      {/* Point Load Arrow */}
                      <line x1="150" y1="12" x2="150" y2="36" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                      <polygon points="150,38 145,28 155,28" fill="#f59e0b" />
                      <text x="155" y="24" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        P = {pointLoad} kN
                      </text>

                      {/* Span label */}
                      <line x1="30" y1="72" x2="270" y2="72" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="135" y="70" fill="#94a3b8" fontSize="9">
                        L = {beamLength} m
                      </text>
                    </svg>
                  </div>

                  {/* Calculated outputs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-lg bg-blue-950/40 border border-blue-800/40 p-2.5">
                      <div className="text-[10px] text-blue-300 font-mono uppercase">Max Bending Moment (Mmax)</div>
                      <div className="text-lg font-bold text-white font-mono">{maxMomentSS.toFixed(1)} kNm</div>
                      <div className="text-[10px] text-slate-400">Formula: P·L / 4</div>
                    </div>
                    <div className="rounded-lg bg-amber-950/40 border border-amber-800/40 p-2.5">
                      <div className="text-[10px] text-amber-300 font-mono uppercase">Support Shear (Vmax)</div>
                      <div className="text-lg font-bold text-white font-mono">{maxShearSS.toFixed(1)} kN</div>
                      <div className="text-[10px] text-slate-400">Reaction: P / 2</div>
                    </div>
                  </div>

                  <Link
                    href="/calculators?tab=beam"
                    className="block text-center text-xs text-blue-400 hover:text-blue-300 hover:underline pt-1 font-mono"
                  >
                    Open Full Beam Calculator with Shear & Deflection Plots →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Feature: Engineering X-Ray Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-[#0c1830] via-[#091122] to-[#060a12] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300 font-mono">
                <Sparkles className="h-3.5 w-3.5" /> SIGNATURE CAPABILITY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineering X-Ray with Archie
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Examine structural systems from the inside out. Upload or select any infrastructure photo,
                and Archie immediately breaks down the <strong>structural framing</strong>,{" "}
                <strong>dominant load paths</strong>, <strong>materials</strong>,{" "}
                <strong>failure modes</strong>, and <strong>governing design codes</strong>.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Structural Framing", "Load Path Tracing", "IS / ACI Code Check", "Material Specs", "Safety Factors"].map(
                  (feature) => (
                    <span
                      key={feature}
                      className="rounded-lg bg-blue-950/70 border border-blue-800/60 px-2.5 py-1 text-xs text-blue-300 font-mono"
                    >
                      ✓ {feature}
                    </span>
                  )
                )}
              </div>
              <div className="pt-4">
                <Link
                  href="/archie"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/30"
                >
                  <BrainCircuit className="h-4 w-4 text-amber-300" />
                  <span>Try Engineering X-Ray Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-xl">
                <img
                  src="/images/marvels/millau-viaduct.jpg"
                  alt="Millau Viaduct X-Ray Preview"
                  className="w-full h-64 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0a1120]/90 border border-blue-500/30 backdrop-blur-md text-xs font-mono">
                  <div className="text-blue-400 font-bold mb-1 flex items-center justify-between">
                    <span>X-RAY: CABLE-STAYED SUPERSTRUCTURE</span>
                    <span className="text-[10px] text-emerald-400">SCAN COMPLETED</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Deck load → Stay tension cables → Inverted-Y pylons → Deep rock sockets.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Engineering Marvels */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-400 tracking-wider uppercase font-mono mb-1">
              GLOBAL INFRASTRUCTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Engineering Marvels
            </h2>
          </div>
          <Link
            href="/marvels"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            <span>Explore All 6+ Megaprojects</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARVELS_DATA.slice(0, 3).map((marvel) => (
            <Link
              key={marvel.id}
              href={`/marvels/${marvel.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1322] hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={marvel.heroImage}
                  alt={marvel.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 rounded bg-blue-950/90 border border-blue-700/60 px-2 py-0.5 text-[10px] font-bold text-blue-300 font-mono">
                  {marvel.category}
                </div>
                <div className="absolute top-3 right-3 rounded bg-slate-900/90 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                  {marvel.completionYear}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {marvel.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {marvel.location}, {marvel.country}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {marvel.summary}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{marvel.heightOrLength}</span>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                    Case Study →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Engineering Calculators Suite Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl border border-blue-900/40 bg-[#0c1220]/80 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wider uppercase font-mono mb-1">
                PRECISION TOOLS
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Civil Engineering Calculators Suite
              </h2>
            </div>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600/20 border border-blue-500/40 px-4 py-2 text-xs font-bold text-blue-300 hover:bg-blue-600/30 transition-all font-mono"
            >
              <Calculator className="h-3.5 w-3.5 text-blue-400" />
              <span>Launch Calculator Suite</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Beam SFD & BMD Solver",
                desc: "Simply supported and cantilever beam shear forces, bending moments, and deflection diagrams.",
                tab: "beam",
                icon: Sliders,
              },
              {
                title: "Concrete Mix Designer",
                desc: "IS 10262 & ACI compliant water-cement ratio, cement, fine & coarse aggregate quantities.",
                tab: "concrete",
                icon: Layers,
              },
              {
                title: "Steel Rebar & BBS Estimator",
                desc: "Bar bending schedules, diameter weights (D²/162), and cutting lengths.",
                tab: "rebar",
                icon: Activity,
              },
              {
                title: "Terzaghi Bearing Capacity",
                desc: "Cohesion, surcharge, footing width, and ultimate/safe soil load calculations.",
                tab: "bearing",
                icon: ShieldCheck,
              },
            ].map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.title}
                  href={`/calculators?tab=${calc.tab}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-300">
                    {calc.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {calc.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Knowledge Graph & Learn Section Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Knowledge Graph Promo */}
          <div className="lg:col-span-6 rounded-2xl border border-blue-900/40 bg-[#0a101d] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded bg-cyan-950/80 border border-cyan-700/50 px-2.5 py-1 text-xs font-mono text-cyan-300">
                <Globe className="h-3.5 w-3.5" /> INTERCONNECTED KNOWLEDGE
              </div>
              <h3 className="text-2xl font-bold text-white">
                Interactive Knowledge Graph
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Civil engineering is not a collection of isolated facts. Explore how
                materials like <strong>High-Performance Concrete</strong> connect to structures like the{" "}
                <strong>Burj Khalifa</strong>, governed by <strong>IS 456 / ACI 318</strong> codes, and calculated
                via interactive equations.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/graph"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600/20 border border-cyan-500/40 px-5 py-2.5 text-xs font-bold text-cyan-300 hover:bg-cyan-600/30 transition-all font-mono"
              >
                <span>Launch Interactive 2D Graph</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Structured Learn Courses Promo */}
          <div className="lg:col-span-6 rounded-2xl border border-blue-900/40 bg-[#0a101d] p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-1 text-xs font-mono text-emerald-300">
                <BookOpen className="h-3.5 w-3.5" /> STRUCTURED LEARNING
              </div>
              <h3 className="text-2xl font-bold text-white">
                Civil Engineering Learning Paths
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Follow guided curriculum tracks with formula breakdowns, interactive SVG diagrams,
                and chapter quizzes backed by Archie's Socratic explanations.
              </p>
              <div className="space-y-2 pt-2">
                {COURSES_DATA.map((course) => (
                  <Link
                    key={course.id}
                    href={`/learn/${course.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs transition-colors"
                  >
                    <span className="font-semibold text-slate-200">{course.title}</span>
                    <span className="text-emerald-400 font-mono">{course.estimatedHours} hrs →</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-600/30 transition-all font-mono"
              >
                <span>View All Courses & Quizzes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News / Research Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            Infrastructure News & Breakthroughs
          </h2>
          <Link href="/news" className="text-xs font-semibold text-blue-400 hover:underline">
            All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_DATA.map((article) => (
            <Link
              key={article.id}
              href="/news"
              className="rounded-xl border border-slate-800 bg-[#0c1322] p-4 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {article.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 hover:text-blue-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>
              <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>{article.publishedDate}</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
