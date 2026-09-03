"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calculator,
  Sliders,
  Layers,
  Activity,
  ShieldCheck,
  Columns,
  RefreshCw,
  Sparkles,
  Download,
  Bookmark,
  Check,
  Info,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

function CalculatorsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "beam";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  // ----------------------------------------------------
  // 1. BEAM CALCULATOR STATE & MATH
  // ----------------------------------------------------
  const [beamType, setBeamType] = useState<"simply-supported" | "cantilever">("simply-supported");
  const [spanLength, setSpanLength] = useState<number>(6); // meters
  const [pointLoadP, setPointLoadP] = useState<number>(20); // kN
  const [pointLoadX, setPointLoadX] = useState<number>(3); // m from left
  const [udlW, setUdlW] = useState<number>(10); // kN/m

  // Beam calculations
  let rA = 0;
  let rB = 0;
  let maxMoment = 0;
  let maxShear = 0;
  let maxMomentLoc = 0;

  if (beamType === "simply-supported") {
    // Total load from UDL = udlW * spanLength
    const totalUdl = udlW * spanLength;
    // Moment about B = 0 -> Ra * L = P * (L - a) + (udlW * L * L/2)
    rA = (pointLoadP * (spanLength - pointLoadX) + totalUdl * (spanLength / 2)) / spanLength;
    rB = pointLoadP + totalUdl - rA;
    maxShear = Math.max(rA, rB);

    // Finding zero shear position
    // V(x) = Ra - udlW * x (before point load)
    if (udlW > 0) {
      const xZeroShear = rA / udlW;
      if (xZeroShear <= pointLoadX) {
        maxMomentLoc = xZeroShear;
        maxMoment = rA * xZeroShear - 0.5 * udlW * xZeroShear * xZeroShear;
      } else {
        // Zero shear occurs at or after point load
        const xZeroShearAfter = (rA - pointLoadP) / udlW;
        maxMomentLoc = Math.max(0, Math.min(spanLength, xZeroShearAfter));
        maxMoment = rA * pointLoadX - 0.5 * udlW * pointLoadX * pointLoadX;
      }
    } else {
      maxMomentLoc = pointLoadX;
      maxMoment = rA * pointLoadX;
    }
  } else {
    // Cantilever beam (fixed at left x=0)
    rA = pointLoadP + udlW * spanLength;
    rB = 0;
    maxShear = rA;
    // Hogging moment at support
    maxMoment = pointLoadP * pointLoadX + (udlW * spanLength * spanLength) / 2;
    maxMomentLoc = 0;
  }

  // ----------------------------------------------------
  // 2. CONCRETE MIX DESIGN STATE & MATH (IS 10262)
  // ----------------------------------------------------
  const [concreteGrade, setConcreteGrade] = useState<string>("M25");
  const [concreteVolume, setConcreteVolume] = useState<number>(10); // m3
  const [slumpReq, setSlumpReq] = useState<number>(100); // mm

  const concreteMixRatios: Record<string, { cement: number; sand: number; agg: number; wc: number; target: number }> = {
    M15: { cement: 1, sand: 2, agg: 4, wc: 0.55, target: 20.7 },
    M20: { cement: 1, sand: 1.5, agg: 3, wc: 0.50, target: 26.6 },
    M25: { cement: 1, sand: 1, agg: 2, wc: 0.45, target: 31.6 },
    M30: { cement: 1, sand: 0.9, agg: 1.8, wc: 0.42, target: 38.25 },
    M35: { cement: 1, sand: 0.8, agg: 1.6, wc: 0.40, target: 43.25 },
    M40: { cement: 1, sand: 0.75, agg: 1.5, wc: 0.38, target: 48.25 },
  };

  const currentMix = concreteMixRatios[concreteGrade] || concreteMixRatios.M25;
  // Dry volume coefficient ~ 1.54 to 1.57
  const dryVolFactor = 1.54;
  const totalRatioParts = currentMix.cement + currentMix.sand + currentMix.agg;
  const cementVol = (concreteVolume * dryVolFactor * currentMix.cement) / totalRatioParts;
  const cementKg = cementVol * 1440; // density of cement ~ 1440 kg/m3
  const cementBags = cementKg / 50;
  const sandKg = ((concreteVolume * dryVolFactor * currentMix.sand) / totalRatioParts) * 1600; // sand ~ 1600 kg/m3
  const aggKg = ((concreteVolume * dryVolFactor * currentMix.agg) / totalRatioParts) * 1550; // agg ~ 1550 kg/m3
  const waterLiters = cementKg * currentMix.wc;

  // ----------------------------------------------------
  // 3. STEEL REBAR & BBS ESTIMATOR STATE & MATH
  // ----------------------------------------------------
  const [rebarDiameter, setRebarDiameter] = useState<number>(16); // mm
  const [rebarBarLength, setRebarBarLength] = useState<number>(12); // m standard
  const [rebarCount, setRebarCount] = useState<number>(50); // bars
  const [hookDeduction, setHookDeduction] = useState<number>(2); // 90 deg bends

  const weightPerMeter = (rebarDiameter * rebarDiameter) / 162.2;
  const totalRebarLength = rebarBarLength * rebarCount;
  const totalRebarWeightKg = totalRebarLength * weightPerMeter;
  const totalRebarTonnes = totalRebarWeightKg / 1000;

  // ----------------------------------------------------
  // 4. TERZAGHI BEARING CAPACITY STATE & MATH
  // ----------------------------------------------------
  const [footingType, setFootingType] = useState<"strip" | "square" | "circular">("square");
  const [soilCohesionC, setSoilCohesionC] = useState<number>(20); // kPa
  const [soilPhi, setSoilPhi] = useState<number>(25); // degrees
  const [soilGamma, setSoilGamma] = useState<number>(18); // kN/m3
  const [footingDepthDf, setFootingDepthDf] = useState<number>(1.5); // m
  const [footingWidthB, setFootingWidthB] = useState<number>(2.0); // m
  const [fos, setFos] = useState<number>(3.0);

  // Approximate Terzaghi bearing factors for phi
  const phiRad = (soilPhi * Math.PI) / 180;
  const Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan(Math.PI / 4 + phiRad / 2), 2);
  const Nc = soilPhi === 0 ? 5.7 : (Nq - 1) / Math.tan(phiRad);
  const Ngamma = 2 * (Nq + 1) * Math.tan(phiRad);

  let shapeC = 1.0;
  let shapeGamma = 0.5;
  if (footingType === "square") {
    shapeC = 1.3;
    shapeGamma = 0.4;
  } else if (footingType === "circular") {
    shapeC = 1.3;
    shapeGamma = 0.3;
  }

  const surchargeQ = soilGamma * footingDepthDf;
  const qUlt = shapeC * soilCohesionC * Nc + surchargeQ * Nq + shapeGamma * soilGamma * footingWidthB * Ngamma;
  const qSafe = (qUlt - surchargeQ) / fos + surchargeQ;

  // ----------------------------------------------------
  // 5. RCC COLUMN CAPACITY (IS 456 / ACI 318)
  // ----------------------------------------------------
  const [colWidth, setColWidth] = useState<number>(300); // mm
  const [colDepth, setColDepth] = useState<number>(450); // mm
  const [colFck, setColFck] = useState<number>(25); // MPa
  const [colFy, setColFy] = useState<number>(500); // MPa
  const [colRebarPct, setColRebarPct] = useState<number>(2.0); // %

  const grossAreaAg = colWidth * colDepth; // mm2
  const steelAreaAsc = (colRebarPct / 100) * grossAreaAg;
  const concreteAreaAc = grossAreaAg - steelAreaAsc;
  // IS 456 Cl 39.3: Pu = 0.4 * fck * Ac + 0.67 * fy * Asc
  const axialCapacityPuKn = (0.4 * colFck * concreteAreaAc + 0.67 * colFy * steelAreaAsc) / 1000;

  // ----------------------------------------------------
  // 6. UNIT CONVERTER
  // ----------------------------------------------------
  const [convValue, setConvValue] = useState<number>(100);
  const [convType, setConvType] = useState<"stress" | "force" | "moment">("stress");

  const handleSaveCalculation = () => {
    const calculationRecord = {
      id: `calc-${Date.now()}`,
      tab: activeTab,
      date: new Date().toLocaleDateString(),
      summary:
        activeTab === "beam"
          ? `Beam (${beamType}, L=${spanLength}m) -> Mmax=${maxMoment.toFixed(1)}kNm, Vmax=${maxShear.toFixed(1)}kN`
          : activeTab === "concrete"
          ? `Concrete Mix (${concreteGrade}, Vol=${concreteVolume}m³) -> Cement=${Math.ceil(cementBags)} bags`
          : activeTab === "rebar"
          ? `Steel BBS (Dia=${rebarDiameter}mm, ${rebarCount} bars) -> ${totalRebarTonnes.toFixed(2)} tonnes`
          : `Geotechnical Bearing -> Qsafe=${qSafe.toFixed(1)} kPa (FOS=${fos})`,
    };

    const existing = JSON.parse(localStorage.getItem("civilverse_saved_calcs") || "[]");
    localStorage.setItem("civilverse_saved_calcs", JSON.stringify([calculationRecord, ...existing]));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/90 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3 py-1 text-xs text-blue-300 font-mono mb-2">
                <Calculator className="h-3.5 w-3.5 text-blue-400" />
                <span>INTERACTIVE ENGINEERING CALCULATION SUITE</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Civil Engineering Calculators
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Real-time formula solvers, shear/bending diagrams, concrete proportioning, and geotechnical limit state evaluations.
              </p>
            </div>

            <button
              onClick={handleSaveCalculation}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/25 self-start md:self-auto font-mono"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" /> Saved to Workspace
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 text-amber-300" /> Save Active Calculation
                </>
              )}
            </button>
          </div>

          {/* Calculator Tabs Navigation */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "beam", label: "Beam SFD / BMD", icon: Sliders },
              { id: "concrete", label: "Concrete Mix Design", icon: Layers },
              { id: "rebar", label: "Steel Rebar & BBS", icon: Activity },
              { id: "bearing", label: "Terzaghi Soil Bearing", icon: ShieldCheck },
              { id: "column", label: "RCC Column Capacity", icon: Columns },
              { id: "converter", label: "Unit Converter", icon: RefreshCw },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all font-mono ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40"
                      : "bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* ======================================================== */}
        {/* 1. BEAM CALCULATOR TAB */}
        {/* ======================================================== */}
        {activeTab === "beam" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Parameters Form */}
            <div className="lg:col-span-5 rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-5 cad-corner shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4" /> Beam Parameters
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">IS 456 / ACI 318</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Support Type */}
                <div>
                  <label className="block text-slate-300 mb-1">Beam Support Condition:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBeamType("simply-supported")}
                      className={`p-2 rounded-lg font-mono font-medium border text-center ${
                        beamType === "simply-supported"
                          ? "bg-blue-600/30 border-blue-500 text-blue-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      Simply Supported
                    </button>
                    <button
                      onClick={() => setBeamType("cantilever")}
                      className={`p-2 rounded-lg font-mono font-medium border text-center ${
                        beamType === "cantilever"
                          ? "bg-blue-600/30 border-blue-500 text-blue-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      Cantilever
                    </button>
                  </div>
                </div>

                {/* Span Length */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Total Span Length (L):</span>
                    <span className="font-mono text-blue-400">{spanLength} m</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="0.5"
                    value={spanLength}
                    onChange={(e) => setSpanLength(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Point Load Magnitude */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Point Load Magnitude (P):</span>
                    <span className="font-mono text-amber-400">{pointLoadP} kN</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={pointLoadP}
                    onChange={(e) => setPointLoadP(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Point Load Position */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Point Load Location (from left support):</span>
                    <span className="font-mono text-slate-300">{pointLoadX} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max={spanLength - 0.5}
                    step="0.5"
                    value={Math.min(pointLoadX, spanLength - 0.5)}
                    onChange={(e) => setPointLoadX(Number(e.target.value))}
                    className="w-full accent-slate-500"
                  />
                </div>

                {/* Uniformly Distributed Load */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Uniform Distributed Load (w):</span>
                    <span className="font-mono text-cyan-400">{udlW} kN/m</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={udlW}
                    onChange={(e) => setUdlW(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Diagrams and Output Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Metric Result Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="rounded-xl bg-blue-950/50 border border-blue-800/60 p-3">
                  <div className="text-[10px] text-blue-300 uppercase">Reaction A (Ra)</div>
                  <div className="text-lg font-bold text-white">{rA.toFixed(1)} kN</div>
                </div>
                <div className="rounded-xl bg-blue-950/50 border border-blue-800/60 p-3">
                  <div className="text-[10px] text-blue-300 uppercase">Reaction B (Rb)</div>
                  <div className="text-lg font-bold text-white">{rB.toFixed(1)} kN</div>
                </div>
                <div className="rounded-xl bg-amber-950/50 border border-amber-800/60 p-3">
                  <div className="text-[10px] text-amber-300 uppercase">Max Moment (Mmax)</div>
                  <div className="text-lg font-bold text-amber-300">{maxMoment.toFixed(1)} kNm</div>
                </div>
                <div className="rounded-xl bg-cyan-950/50 border border-cyan-800/60 p-3">
                  <div className="text-[10px] text-cyan-300 uppercase">Max Shear (Vmax)</div>
                  <div className="text-lg font-bold text-cyan-300">{maxShear.toFixed(1)} kN</div>
                </div>
              </div>

              {/* Dynamic SVG Visualizer for SFD and BMD */}
              <div className="rounded-2xl border border-slate-800 bg-[#070b14] p-6 space-y-6 shadow-xl">
                {/* 1. Loading Diagram */}
                <div>
                  <div className="text-xs font-mono font-bold text-slate-300 mb-2">
                    1. BEAM LOADING DIAGRAM
                  </div>
                  <svg viewBox="0 0 500 90" className="w-full h-24 bg-[#090e1a] rounded-lg p-2 border border-slate-800">
                    <line x1="50" y1="50" x2="450" y2="50" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
                    {/* Supports */}
                    <polygon points="50,53 40,70 60,70" fill="#94a3b8" />
                    {beamType === "simply-supported" ? (
                      <circle cx="450" cy="62" r="7" fill="#94a3b8" />
                    ) : (
                      <line x1="50" y1="20" x2="50" y2="80" stroke="#64748b" strokeWidth="8" />
                    )}

                    {/* Point load arrow */}
                    {pointLoadP > 0 && (
                      <g transform={`translate(${50 + (pointLoadX / spanLength) * 400}, 20)`}>
                        <line x1="0" y1="0" x2="0" y2="25" stroke="#f59e0b" strokeWidth="3" />
                        <polygon points="0,28 -5,18 5,18" fill="#f59e0b" />
                        <text x="-15" y="-3" fill="#f59e0b" fontSize="10" fontWeight="bold">
                          {pointLoadP}kN
                        </text>
                      </g>
                    )}

                    {/* UDL hatched arrows */}
                    {udlW > 0 && (
                      <g>
                        {[0.1, 0.3, 0.5, 0.7, 0.9].map((ratio, i) => (
                          <line
                            key={i}
                            x1={50 + ratio * 400}
                            y1="34"
                            x2={50 + ratio * 400}
                            y2="46"
                            stroke="#06b6d4"
                            strokeWidth="1.5"
                          />
                        ))}
                        <text x="220" y="30" fill="#06b6d4" fontSize="10" fontWeight="bold">
                          w = {udlW} kN/m
                        </text>
                      </g>
                    )}
                  </svg>
                </div>

                {/* 2. Shear Force Diagram (SFD) */}
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 mb-2 flex justify-between">
                    <span>2. SHEAR FORCE DIAGRAM (SFD)</span>
                    <span className="text-slate-400">Vmax = {maxShear.toFixed(1)} kN</span>
                  </div>
                  <svg viewBox="0 0 500 80" className="w-full h-20 bg-[#090e1a] rounded-lg p-2 border border-slate-800">
                    <line x1="50" y1="40" x2="450" y2="40" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    {/* SFD Polyline representation */}
                    <path
                      d={`M 50 40 L 50 ${40 - Math.min(30, rA * 0.8)} L ${50 + (pointLoadX / spanLength) * 400} ${
                        40 - Math.min(30, (rA - udlW * pointLoadX) * 0.8)
                      } L ${50 + (pointLoadX / spanLength) * 400} ${
                        40 - Math.min(30, (rA - udlW * pointLoadX - pointLoadP) * 0.8)
                      } L 450 ${40 + Math.min(30, rB * 0.8)} L 450 40 Z`}
                      fill="rgba(6, 182, 212, 0.15)"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                    <text x="55" y="25" fill="#06b6d4" fontSize="10" fontWeight="bold">
                      +{rA.toFixed(0)} kN
                    </text>
                    <text x="410" y="65" fill="#06b6d4" fontSize="10" fontWeight="bold">
                      -{rB.toFixed(0)} kN
                    </text>
                  </svg>
                </div>

                {/* 3. Bending Moment Diagram (BMD) */}
                <div>
                  <div className="text-xs font-mono font-bold text-amber-300 mb-2 flex justify-between">
                    <span>3. BENDING MOMENT DIAGRAM (BMD)</span>
                    <span className="text-slate-400">Mpeak = {maxMoment.toFixed(1)} kNm</span>
                  </div>
                  <svg viewBox="0 0 500 90" className="w-full h-24 bg-[#090e1a] rounded-lg p-2 border border-slate-800">
                    <line x1="50" y1="20" x2="450" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Parabolic / triangular bending curve */}
                    <path
                      d={`M 50 20 Q ${50 + (maxMomentLoc / spanLength) * 400} ${
                        20 + Math.min(60, maxMoment * 0.6)
                      } 450 20 Z`}
                      fill="rgba(245, 158, 11, 0.15)"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                    <text
                      x={30 + (maxMomentLoc / spanLength) * 400}
                      y={40 + Math.min(45, maxMoment * 0.5)}
                      fill="#f59e0b"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      Mmax = {maxMoment.toFixed(1)} kNm
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. CONCRETE MIX DESIGN TAB */}
        {/* ======================================================== */}
        {activeTab === "concrete" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-5 cad-corner shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase text-blue-400 flex items-center gap-2">
                  <Layers className="h-4 w-4" /> Concrete Mix Inputs
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">IS 10262:2019</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Target Concrete Grade:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["M15", "M20", "M25", "M30", "M35", "M40"].map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setConcreteGrade(grade)}
                        className={`p-2 rounded-lg font-mono font-bold border text-center ${
                          concreteGrade === grade
                            ? "bg-blue-600/30 border-blue-500 text-blue-300"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Total Pour Volume:</span>
                    <span className="font-mono text-blue-400">{concreteVolume} m³</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={concreteVolume}
                    onChange={(e) => setConcreteVolume(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Design Water-Cement (w/c) Ratio:</span>
                    <span className="font-mono text-amber-400">{currentMix.wc}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Complies with IS 456 Table 5 maximum durability limits.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    ESTIMATED BATCH MATERIALS FOR {concreteVolume} m³ ({concreteGrade})
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    Target Mean: {currentMix.target} N/mm²
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                  <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-4">
                    <div className="text-[10px] text-blue-300 uppercase">Cement Bags (50kg)</div>
                    <div className="text-2xl font-extrabold text-white">{Math.ceil(cementBags)}</div>
                    <div className="text-[11px] text-slate-400 mt-1">({(cementKg / 1000).toFixed(2)} tonnes)</div>
                  </div>

                  <div className="rounded-xl bg-amber-950/40 border border-amber-800/50 p-4">
                    <div className="text-[10px] text-amber-300 uppercase">Fine Aggregate (Sand)</div>
                    <div className="text-2xl font-extrabold text-amber-300">{(sandKg / 1000).toFixed(2)}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Metric Tonnes</div>
                  </div>

                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                    <div className="text-[10px] text-slate-300 uppercase">Coarse Aggregate</div>
                    <div className="text-2xl font-extrabold text-white">{(aggKg / 1000).toFixed(2)}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Metric Tonnes</div>
                  </div>

                  <div className="rounded-xl bg-cyan-950/40 border border-cyan-800/50 p-4">
                    <div className="text-[10px] text-cyan-300 uppercase">Mixing Water</div>
                    <div className="text-2xl font-extrabold text-cyan-300">{Math.round(waterLiters)}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Liters</div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#090e1a] p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white font-mono flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-400" /> Nominal Proportions:
                  </div>
                  <p>
                    Mix Ratio: 1 (Cement) : {currentMix.sand} (Fine Aggregate) : {currentMix.agg} (Coarse Aggregate).
                    Admixture dosage recommended at 0.5% - 0.8% weight of cement for high workability pumping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. STEEL REBAR & BBS ESTIMATOR TAB */}
        {/* ======================================================== */}
        {activeTab === "rebar" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-5 cad-corner shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white font-mono uppercase text-blue-400 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Rebar Dimensions
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">IS 1786 / ASTM A615</span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Bar Diameter (Φ):</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[8, 10, 12, 16, 20, 25, 32].map((dia) => (
                      <button
                        key={dia}
                        onClick={() => setRebarDiameter(dia)}
                        className={`p-2 rounded-lg font-mono font-bold border text-center ${
                          rebarDiameter === dia
                            ? "bg-blue-600/30 border-blue-500 text-blue-300"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {dia} mm
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Cut Length per Bar:</span>
                    <span className="font-mono text-blue-400">{rebarBarLength} meters</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="18"
                    step="0.5"
                    value={rebarBarLength}
                    onChange={(e) => setRebarBarLength(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Total Number of Bars:</span>
                    <span className="font-mono text-amber-400">{rebarCount} bars</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={rebarCount}
                    onChange={(e) => setRebarCount(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-6 shadow-xl font-mono">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    BAR BENDING SCHEDULE (BBS) OUTPUT
                  </span>
                  <span className="text-xs text-slate-400">ρ = D² / 162.2 kg/m</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-4">
                    <div className="text-[10px] text-blue-300 uppercase">Unit Weight</div>
                    <div className="text-xl font-bold text-white">{weightPerMeter.toFixed(3)} kg/m</div>
                  </div>

                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                    <div className="text-[10px] text-slate-400 uppercase">Total Length</div>
                    <div className="text-xl font-bold text-white">{totalRebarLength} m</div>
                  </div>

                  <div className="rounded-xl bg-amber-950/40 border border-amber-800/50 p-4">
                    <div className="text-[10px] text-amber-300 uppercase">Total Weight</div>
                    <div className="text-xl font-bold text-amber-300">{totalRebarTonnes.toFixed(3)} t</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">({totalRebarWeightKg.toFixed(1)} kg)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. TERZAGHI SOIL BEARING CAPACITY TAB */}
        {/* ======================================================== */}
        {activeTab === "bearing" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-4 cad-corner shadow-xl text-xs">
              <h3 className="text-sm font-bold text-white font-mono uppercase text-blue-400 border-b border-slate-800 pb-2">
                Geotechnical Soil & Footing Inputs
              </h3>

              <div>
                <label className="block text-slate-300 mb-1">Footing Geometry:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["square", "strip", "circular"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFootingType(type)}
                      className={`p-1.5 rounded-lg font-mono font-bold capitalize border text-center ${
                        footingType === type
                          ? "bg-blue-600/30 border-blue-500 text-blue-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Soil Cohesion (c):</span>
                  <span className="font-mono text-blue-400">{soilCohesionC} kPa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={soilCohesionC}
                  onChange={(e) => setSoilCohesionC(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Angle of Internal Friction (ϕ):</span>
                  <span className="font-mono text-amber-400">{soilPhi}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="45"
                  step="1"
                  value={soilPhi}
                  onChange={(e) => setSoilPhi(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Soil Unit Weight (γ):</span>
                  <span className="font-mono text-slate-300">{soilGamma} kN/m³</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="22"
                  step="0.5"
                  value={soilGamma}
                  onChange={(e) => setSoilGamma(Number(e.target.value))}
                  className="w-full accent-slate-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Footing Width (B):</span>
                  <span className="font-mono text-cyan-400">{footingWidthB} m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.25"
                  value={footingWidthB}
                  onChange={(e) => setFootingWidthB(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-5 shadow-xl font-mono">
                <div className="border-b border-slate-800 pb-2 flex justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase">
                    BEARING CAPACITY COMPUTATIONS
                  </span>
                  <span className="text-xs text-slate-400">FOS = {fos}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                    <div className="text-[10px] text-slate-400 uppercase">Ultimate Bearing Capacity (q_ult)</div>
                    <div className="text-2xl font-bold text-white">{qUlt.toFixed(1)} kPa</div>
                  </div>

                  <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/50 p-4">
                    <div className="text-[10px] text-emerald-300 uppercase">Safe Bearing Capacity (q_safe)</div>
                    <div className="text-2xl font-bold text-emerald-300">{qSafe.toFixed(1)} kPa</div>
                    <div className="text-[10px] text-slate-400 mt-1">({(qSafe / 100).toFixed(2)} kg/cm²)</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1 bg-[#090e1a] p-3 rounded-lg border border-slate-800">
                  <div>Terzaghi Factors: Nc = {Nc.toFixed(2)}, Nq = {Nq.toFixed(2)}, Nγ = {Ngamma.toFixed(2)}</div>
                  <div>Surcharge Pressure: q = γ · Df = {surchargeQ.toFixed(1)} kPa</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. COLUMN AXIAL CAPACITY TAB */}
        {/* ======================================================== */}
        {activeTab === "column" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-4 cad-corner shadow-xl text-xs">
              <h3 className="text-sm font-bold text-white font-mono uppercase text-blue-400 border-b border-slate-800 pb-2">
                RCC Column Cross-Section
              </h3>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Width (b) & Depth (D):</span>
                  <span className="font-mono text-blue-400">{colWidth} x {colDepth} mm</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="50"
                    value={colWidth}
                    onChange={(e) => setColWidth(Number(e.target.value))}
                  />
                  <input
                    type="range"
                    min="200"
                    max="1000"
                    step="50"
                    value={colDepth}
                    onChange={(e) => setColDepth(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Longitudinal Steel Percentage (p):</span>
                  <span className="font-mono text-amber-400">{colRebarPct}%</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="4.0"
                  step="0.2"
                  value={colRebarPct}
                  onChange={(e) => setColRebarPct(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <span className="text-slate-400">Concrete fck:</span>
                  <select
                    value={colFck}
                    onChange={(e) => setColFck(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                  >
                    <option value={20}>M20</option>
                    <option value={25}>M25</option>
                    <option value={30}>M30</option>
                    <option value={40}>M40</option>
                  </select>
                </div>
                <div>
                  <span className="text-slate-400">Steel fy:</span>
                  <select
                    value={colFy}
                    onChange={(e) => setColFy(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                  >
                    <option value={415}>Fe 415</option>
                    <option value={500}>Fe 500</option>
                    <option value={550}>Fe 550</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 font-mono">
              <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-4">
                <div className="text-xs font-bold text-blue-400 uppercase border-b border-slate-800 pb-2">
                  IS 456 CL 39.3 AXIAL LOAD CAPACITY
                </div>

                <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-5">
                  <div className="text-xs text-blue-300 uppercase">Factored Axial Capacity (Pu)</div>
                  <div className="text-3xl font-extrabold text-white mt-1">{axialCapacityPuKn.toFixed(0)} kN</div>
                  <div className="text-xs text-slate-400 mt-1">({(axialCapacityPuKn / 9.81).toFixed(1)} tonnes metric load)</div>
                </div>

                <div className="text-xs text-slate-300 space-y-1 bg-[#090e1a] p-3 rounded-lg border border-slate-800">
                  <div>Gross Area (Ag) = {grossAreaAg} mm²</div>
                  <div>Steel Area (Asc) = {steelAreaAsc.toFixed(0)} mm²</div>
                  <div>Formula: Pu = 0.4·fck·Ac + 0.67·fy·Asc</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. UNIT CONVERTER TAB */}
        {/* ======================================================== */}
        {activeTab === "converter" && (
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-6 font-mono">
            <h3 className="text-sm font-bold text-amber-400 uppercase border-b border-slate-800 pb-2">
              Civil Engineering Unit Converter
            </h3>

            <div className="flex items-center gap-4">
              <input
                type="number"
                value={convValue}
                onChange={(e) => setConvValue(Number(e.target.value))}
                className="w-48 bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg font-bold text-white"
              />
              <span className="text-slate-400 font-bold">MegaPascals (MPa / N/mm²)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <div className="text-slate-400">Pounds / sq inch (psi):</div>
                <div className="text-base font-bold text-white">{(convValue * 145.038).toFixed(1)} psi</div>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <div className="text-slate-400">kiloNewtons / m² (kPa):</div>
                <div className="text-base font-bold text-white">{(convValue * 1000).toFixed(0)} kPa</div>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <div className="text-slate-400">Kilograms / cm² (kg/cm²):</div>
                <div className="text-base font-bold text-white">{(convValue * 10.197).toFixed(2)} kg/cm²</div>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <div className="text-slate-400">Bar:</div>
                <div className="text-base font-bold text-white">{(convValue * 10).toFixed(1)} bar</div>
              </div>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800">
                <div className="text-slate-400">kips / sq inch (ksi):</div>
                <div className="text-base font-bold text-white">{(convValue * 0.145038).toFixed(3)} ksi</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Engineering Calculators...</div>}>
      <CalculatorsPageContent />
    </Suspense>
  );
}
