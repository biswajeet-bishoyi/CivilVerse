import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Compass,
  CheckCircle2,
  HardHat,
  Sliders,
  Share2,
} from "lucide-react";
import { MARVELS_DATA } from "@/data/marvels";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return MARVELS_DATA.map((m) => ({
    slug: m.slug,
  }));
}

export default async function MarvelDetailPage({ params }: Props) {
  const { slug } = await params;
  const marvel = MARVELS_DATA.find((m) => m.slug === slug);

  if (!marvel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/80 backdrop-blur-sm sticky top-16 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/marvels"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Marvels Archive
          </Link>

          <Link
            href={`/archie?prompt=${encodeURIComponent(`Explain the structural system and load transfer mechanics of the ${marvel.name}`)}`}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 px-3 py-1 text-xs font-mono font-bold text-blue-300 hover:bg-blue-600/30 transition-all"
          >
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span>Consult Archie on {marvel.name}</span>
          </Link>
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden bg-slate-900">
        <img
          src={marvel.heroImage}
          alt={marvel.name}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white font-mono">
                {marvel.category}
              </span>
              <span className="rounded bg-slate-900/80 border border-slate-700 px-2.5 py-0.5 text-xs text-slate-300 font-mono flex items-center gap-1">
                <MapPin className="h-3 w-3 text-red-400" />
                {marvel.location}, {marvel.country}
              </span>
              <span className="rounded bg-slate-900/80 border border-slate-700 px-2.5 py-0.5 text-xs text-slate-300 font-mono">
                Completed {marvel.completionYear}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {marvel.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {marvel.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Anatomy */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Deep Case Study */}
          <div className="lg:col-span-8 space-y-8">
            {/* Structural System & Load Path Card */}
            <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 sm:p-8 shadow-xl cad-corner space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                <Sliders className="h-4 w-4 text-blue-400" />
                <span>1. Structural Framing & Load Path Anatomy</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Structural System: {marvel.structuralSystem}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {marvel.detailedCaseStudy.structuralDesign}
                </p>
              </div>

              <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-4 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-300 uppercase">
                  Dominant Load Transfer Path:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {marvel.loadTransferPath}
                </p>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                  Seismic & Wind Dynamics:
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {marvel.seismicAndWindDamping}
                </p>
              </div>
            </div>

            {/* Geotechnical & Foundation Card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Compass className="h-4 w-4" />
                <span>2. Geotechnical Engineering & Foundation</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                Substructure: {marvel.foundationType}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {marvel.detailedCaseStudy.geotechnicalChallenges}
              </p>
            </div>

            {/* Construction Methodology & Sequence */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <HardHat className="h-4 w-4" />
                <span>3. Construction Methodology & Heavy Erection</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {marvel.detailedCaseStudy.constructionMethodology}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                  Key Engineering Innovations Pioneered:
                </h4>
                <ul className="space-y-2">
                  {marvel.keyEngineeringInnovations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lessons Learned & Durability */}
            <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-[#0c1628] to-[#070b14] p-6 sm:p-8 space-y-3">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300" />
                Engineering Lessons for Modern Practitioners:
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{marvel.detailedCaseStudy.lessonsLearned}"
              </p>
            </div>
          </div>

          {/* Right Column: Key Specifications & DNA Bar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Metrics Card */}
            <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 space-y-4 font-mono">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                ENGINEERING METRICS READOUT
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-slate-400">Total Height / Span:</div>
                  <div className="text-base font-bold text-white">{marvel.heightOrLength}</div>
                </div>

                <div>
                  <div className="text-slate-400">Estimated Capital Cost:</div>
                  <div className="text-base font-bold text-amber-400">{marvel.estimatedCost}</div>
                </div>

                {marvel.metrics.concreteVolume && (
                  <div>
                    <div className="text-slate-400">Total Concrete Volume:</div>
                    <div className="text-sm font-bold text-slate-200">{marvel.metrics.concreteVolume}</div>
                  </div>
                )}

                {marvel.metrics.steelWeight && (
                  <div>
                    <div className="text-slate-400">Structural Steel & Rebar:</div>
                    <div className="text-sm font-bold text-slate-200">{marvel.metrics.steelWeight}</div>
                  </div>
                )}

                {marvel.metrics.maxWindSpeedDesigned && (
                  <div>
                    <div className="text-slate-400">Max Design Wind Speed:</div>
                    <div className="text-sm font-bold text-cyan-300">{marvel.metrics.maxWindSpeedDesigned}</div>
                  </div>
                )}

                {marvel.metrics.peakDischargeCapacity && (
                  <div>
                    <div className="text-slate-400">Peak Spillway Discharge:</div>
                    <div className="text-sm font-bold text-blue-300">{marvel.metrics.peakDischargeCapacity}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Team & Materials */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-4">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                Project Leadership & Materials
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Lead Engineer / Architect:</span>
                  <p className="font-semibold text-white mt-0.5">{marvel.leadArchitectEngineer}</p>
                </div>

                <div>
                  <span className="text-slate-400">Main Contractor:</span>
                  <p className="font-semibold text-white mt-0.5">{marvel.mainContractor}</p>
                </div>

                <div>
                  <span className="text-slate-400">Primary Material Grades:</span>
                  <div className="mt-1 space-y-1">
                    {marvel.materialsUsed.map((mat, i) => (
                      <div key={i} className="rounded bg-slate-900 p-1.5 text-slate-300 border border-slate-800">
                        {mat}
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
