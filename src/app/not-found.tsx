import React from "react";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-blueprint-pattern">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-4 shadow-lg shadow-blue-600/20">
        <Building2 className="h-8 w-8" />
      </div>
      <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-1">
        404 — SECTION NOT FOUND
      </span>
      <h1 className="text-3xl font-extrabold text-white mb-2 font-mono">
        Structure Coordinates Unknown
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        The requested engineering module, marvel case study, or calculation page could not be located
        in the CivilVerse knowledge graph.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white transition-all font-mono"
      >
        <ArrowLeft className="h-4 w-4" /> Return to CivilVerse Hub
      </Link>
    </div>
  );
}
