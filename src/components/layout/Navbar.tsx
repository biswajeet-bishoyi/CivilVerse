"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Compass,
  Calculator,
  BrainCircuit,
  Newspaper,
  Network,
  Bookmark,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Sliders,
  Layers,
  Activity,
  ShieldCheck,
  BookOpen,
  Scale,
} from "lucide-react";
import { SearchModal } from "@/components/SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states
  const [exploreOpen, setExploreOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const exploreRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route change or outside click
  useEffect(() => {
    setExploreOpen(false);
    setToolsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isExploreActive =
    pathname.startsWith("/marvels") ||
    pathname.startsWith("/graph") ||
    pathname.startsWith("/news");

  const isToolsActive =
    pathname.startsWith("/calculators") ||
    pathname.startsWith("/learn") ||
    pathname.startsWith("/workspace");

  const isArchieActive = pathname.startsWith("/archie");

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-blue-900/40 bg-[#090d16]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-600/30 transition-all shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              <Building2 className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#090d16]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">
                  CIVIL<span className="text-blue-400">VERSE</span>
                </span>
                <span className="rounded bg-blue-950 px-1.5 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-800/60 uppercase tracking-widest font-mono">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 font-mono">AI Engineering Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center gap-2">
            {/* 1. Explore Dropdown */}
            <div className="relative" ref={exploreRef}>
              <button
                onClick={() => {
                  setExploreOpen(!exploreOpen);
                  setToolsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isExploreActive || exploreOpen
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Building2 className="h-4 w-4 text-blue-400" />
                <span>Explore</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                    exploreOpen ? "rotate-180 text-blue-400" : ""
                  }`}
                />
              </button>

              {exploreOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-blue-900/50 bg-[#0c1322] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono font-bold text-slate-400 px-3 py-1.5 uppercase">
                    Discovery & Research
                  </div>

                  <Link
                    href="/library"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300">
                        Engineering Library
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Central formulas codex & standards repo
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/marvels"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 group-hover:bg-amber-600/30">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300">
                        Engineering Marvels
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Global megaprojects & structural anatomy
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/materials"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600/30">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                        Materials Database
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Stress-strain, UHPC, & carbon index
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/codes"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600/30">
                      <Scale className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                        Codes Matrix (IS / ACI / EN)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Side-by-side standard clause audit
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/graph"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400 group-hover:bg-cyan-600/30">
                      <Network className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                        Knowledge Graph
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Interactive 2D concept network
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/news"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 group-hover:bg-amber-600/30">
                      <Newspaper className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300">
                        Infrastructure News
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Green concrete & megaproject updates
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Tools & Calculations Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                  setExploreOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isToolsActive || toolsOpen
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Calculator className="h-4 w-4 text-amber-400" />
                <span>Tools & Practice</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                    toolsOpen ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-blue-900/50 bg-[#0c1322] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono font-bold text-slate-400 px-3 py-1.5 uppercase">
                    Calculators & Curriculum
                  </div>

                  <Link
                    href="/calculators"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 group-hover:bg-amber-600/30">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300">
                        Engineering Calculators
                      </div>
                      <div className="text-[11px] text-slate-400">
                        SFD/BMD, Concrete, Rebar & Bearing
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/learn"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600/30">
                      <Compass className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                        Learn & Quizzes
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Mechanics, derivations & exams
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/workspace"
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600/30">
                      <Bookmark className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300">
                        My Workspace
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Saved calculations & notebook
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Direct Archie AI Link */}
            <Link
              href="/archie"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                isArchieActive
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BrainCircuit className="h-4 w-4 text-amber-300" />
              <span>Archie AI</span>
              <span className="rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 px-1.5 py-0.2 text-[9px] font-bold text-amber-300">
                X-Ray
              </span>
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-xs text-slate-300 hover:border-blue-500/50 hover:text-white transition-all shadow-sm"
              title="Search structures, formulas & topics"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/archie"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all border border-blue-400/30"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              <span>Ask Archie</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0c121e] px-4 py-3 space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase px-2">Explore</div>
            <Link
              href="/marvels"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Building2 className="h-4 w-4 text-blue-400" />
              <span>Engineering Marvels</span>
            </Link>
            <Link
              href="/graph"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Network className="h-4 w-4 text-cyan-400" />
              <span>Knowledge Graph</span>
            </Link>
            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Newspaper className="h-4 w-4 text-amber-400" />
              <span>Infrastructure News</span>
            </Link>

            <div className="text-[10px] font-mono text-slate-500 uppercase px-2 pt-2">Tools & Learning</div>
            <Link
              href="/calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Calculator className="h-4 w-4 text-amber-400" />
              <span>Calculators Suite</span>
            </Link>
            <Link
              href="/learn"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>Learn & Quizzes</span>
            </Link>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
            >
              <Bookmark className="h-4 w-4 text-blue-400" />
              <span>My Workspace</span>
            </Link>
            <Link
              href="/archie"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-amber-300 bg-blue-950/40 border border-blue-800/40"
            >
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-4 w-4 text-amber-300" />
                <span>Archie AI & X-Ray</span>
              </div>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] text-amber-300">
                PRO
              </span>
            </Link>
          </div>
        )}
      </header>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
