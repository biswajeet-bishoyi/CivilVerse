import React from "react";
import Link from "next/link";
import { Building2, Shield, BookOpen, Layers, Terminal, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#060910] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                CIVIL<span className="text-blue-400">VERSE</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI-first knowledge and exploration ecosystem for civil engineers, students, and infrastructure researchers.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Governing Engine: Archie AI v2.4 • Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marvels" className="hover:text-blue-400 transition-colors">
                  Engineering Marvels
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-blue-400 transition-colors">
                  Engineering Calculators
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-400 transition-colors">
                  Interactive Learning
                </Link>
              </li>
              <li>
                <Link href="/graph" className="hover:text-blue-400 transition-colors">
                  Knowledge Graph
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-400 transition-colors">
                  Infrastructure News
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Core Calculators
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculators?tab=beam" className="hover:text-blue-400 transition-colors">
                  Beam SFD & BMD
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=concrete" className="hover:text-blue-400 transition-colors">
                  Concrete Mix Design
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=rebar" className="hover:text-blue-400 transition-colors">
                  Steel Rebar & BBS
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=bearing" className="hover:text-blue-400 transition-colors">
                  Terzaghi Soil Bearing
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=converter" className="hover:text-blue-400 transition-colors">
                  Unit Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Standards Reference
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="rounded bg-slate-900/60 p-2 border border-slate-800">
                <span className="font-semibold text-slate-300">IS 456 / IS 10262</span>
                <p className="text-[11px] text-slate-500">Plain & Reinforced Concrete Mix Design</p>
              </div>
              <div className="rounded bg-slate-900/60 p-2 border border-slate-800">
                <span className="font-semibold text-slate-300">ACI 318 / Eurocode 2</span>
                <p className="text-[11px] text-slate-500">Structural Concrete & Limit State Codes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CivilVerse Platform. One Universe. Every Structure. Every Engineer.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-mono">Precision: ISO 9001 / Engineering Curated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
