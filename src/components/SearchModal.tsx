"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Building2,
  BookOpen,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MARVELS_DATA } from "@/data/marvels";
import { CONCEPTS_DATA } from "@/data/concepts";
import { COURSES_DATA } from "@/data/courses";
import { NEWS_DATA } from "@/data/news";
import { MATERIALS_DATA } from "@/data/materials";
import { CODE_COMPARISONS } from "@/data/codes";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredMarvels = q
    ? MARVELS_DATA.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.structuralSystem.toLowerCase().includes(q)
      )
    : [];

  const filteredMaterials = q
    ? MATERIALS_DATA.filter(
        (mat) =>
          mat.name.toLowerCase().includes(q) ||
          mat.standardCode.toLowerCase().includes(q) ||
          mat.category.toLowerCase().includes(q) ||
          mat.description.toLowerCase().includes(q)
      )
    : [];

  const filteredCodes = q
    ? CODE_COMPARISONS.filter(
        (code) =>
          code.topic.toLowerCase().includes(q) ||
          code.category.toLowerCase().includes(q) ||
          code.is456.rule.toLowerCase().includes(q) ||
          code.aci318.rule.toLowerCase().includes(q) ||
          code.eurocode2.rule.toLowerCase().includes(q)
      )
    : [];

  const filteredConcepts = q
    ? CONCEPTS_DATA.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q)
      )
    : [];

  const filteredCourses = q
    ? COURSES_DATA.filter(
        (co) =>
          co.title.toLowerCase().includes(q) ||
          co.description.toLowerCase().includes(q) ||
          co.category.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    filteredMarvels.length +
    filteredMaterials.length +
    filteredCodes.length +
    filteredConcepts.length +
    filteredCourses.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-xl border border-blue-900/50 bg-[#0d1424] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Input Header */}
        <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
          <Search className="h-5 w-5 text-blue-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search engineering marvels, formulas, concrete mixes, codes..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded px-2 py-0.5 text-xs text-slate-400 hover:bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="space-y-4 text-xs text-slate-400">
              <p className="font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Suggested Civil Engineering Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Burj Khalifa",
                  "Shear Force BMD",
                  "Terzaghi Bearing",
                  "Millau Viaduct",
                  "M25 Concrete Mix",
                  "Beam Bending",
                  "Euler Buckling",
                  "Chunnel",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300 hover:border-blue-500/50 hover:text-blue-300 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <p>No direct matches found for "{query}".</p>
              <Link
                href={`/archie?prompt=${encodeURIComponent(`Explain ${query} in civil engineering context.`)}`}
                onClick={onClose}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Ask Archie AI about "{query}"
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Marvels Section */}
              {filteredMarvels.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 font-mono flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Engineering Marvels
                  </h4>
                  <div className="space-y-1.5">
                    {filteredMarvels.map((m) => (
                      <Link
                        key={m.id}
                        href={`/marvels/${m.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 hover:bg-blue-900/20 border border-slate-800/80 hover:border-blue-600/40 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-blue-300">
                            {m.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {m.category} • {m.country} • {m.structuralSystem}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Concepts Section */}
              {filteredConcepts.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2 font-mono flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> Engineering Concepts
                  </h4>
                  <div className="space-y-1.5">
                    {filteredConcepts.map((c) => (
                      <Link
                        key={c.id}
                        href={`/learn#${c.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 hover:bg-amber-900/20 border border-slate-800/80 hover:border-amber-600/40 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-amber-300">
                            {c.title}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">
                            {c.category} • {c.summary}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials Section */}
              {filteredMaterials.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2 font-mono flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Materials Database
                  </h4>
                  <div className="space-y-1.5">
                    {filteredMaterials.map((mat) => (
                      <Link
                        key={mat.id}
                        href="/materials"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 hover:bg-emerald-900/20 border border-slate-800/80 hover:border-emerald-600/40 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-emerald-300">
                            {mat.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {mat.standardCode} • E = {mat.modulusOfElasticity} GPa • {mat.characteristicStrength}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Codes Matrix Section */}
              {filteredCodes.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2 font-mono flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" /> Code Comparison Clauses
                  </h4>
                  <div className="space-y-1.5">
                    {filteredCodes.map((code) => (
                      <Link
                        key={code.id}
                        href="/codes"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 hover:bg-indigo-900/20 border border-slate-800/80 hover:border-indigo-600/40 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-indigo-300">
                            {code.topic}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">
                            {code.category} • IS: {code.is456.clause} vs ACI: {code.aci318.clause}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {filteredCourses.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5" /> Structured Courses
                  </h4>
                  <div className="space-y-1.5">
                    {filteredCourses.map((co) => (
                      <Link
                        key={co.id}
                        href={`/learn/${co.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 hover:bg-cyan-900/20 border border-slate-800/80 hover:border-cyan-600/40 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-cyan-300">
                            {co.title}
                          </div>
                          <div className="text-xs text-slate-400">
                            {co.level} • {co.estimatedHours} hrs • {co.description}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-800 bg-[#080d18] px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
