"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  Calculator,
  Search,
} from "lucide-react";
import { COURSES_DATA } from "@/data/courses";
import { CONCEPTS_DATA } from "@/data/concepts";

export default function LearnPage() {
  const [conceptFilter, setConceptFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const conceptCategories = [
    "All",
    "Structural Analysis",
    "Geotechnical",
    "Concrete & Materials",
    "Fluid Mechanics",
  ];

  const filteredConcepts = CONCEPTS_DATA.filter((c) => {
    const matchesCat = conceptFilter === "All" || c.category === conceptFilter;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.formula && c.formula.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/90 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 text-xs text-emerald-300 font-mono mb-4">
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            <span>STRUCTURED CIVIL ENGINEERING CURRICULUM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn & Engineering Concepts
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
            First-principles derivations, practical structural mechanics, concrete technology, and
            interactive quizzes with Archie AI guidance.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Section 1: Guided Course Paths */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                CURRICULUM PATHWAYS
              </div>
              <h2 className="text-2xl font-bold text-white">Structured Courses & Quizzes</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COURSES_DATA.map((course) => (
              <Link
                key={course.id}
                href={`/learn/${course.slug}`}
                className="group rounded-2xl border border-slate-800 bg-[#0c1322] p-6 hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 text-[10px] font-bold text-emerald-300 font-mono">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.estimatedHours} hrs
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{course.lessons.length} Lessons + Quizzes</span>
                  <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start Learning →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Fundamental Civil Engineering Concepts Encyclopedia */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-blue-400 uppercase">
                ENCYCLOPEDIA & FORMULAS
              </div>
              <h2 className="text-2xl font-bold text-white">Engineering Concepts & Mechanics</h2>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {conceptCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setConceptFilter(cat)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    conceptFilter === cat
                      ? "bg-blue-600 text-white"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredConcepts.map((concept) => (
              <div
                key={concept.id}
                id={concept.slug}
                className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 space-y-4 hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800">
                      {concept.category} • {concept.difficulty}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1.5">{concept.title}</h3>
                  </div>

                  <Link
                    href={`/archie?prompt=${encodeURIComponent(`Explain ${concept.title} and derive its governing equations step by step.`)}`}
                    className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-300 hover:text-white hover:bg-blue-900 transition-colors shrink-0"
                    title="Ask Archie about this concept"
                  >
                    <Sparkles className="h-4 w-4 text-amber-300" />
                  </Link>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{concept.summary}</p>

                {/* Formula Highlight */}
                {concept.formula && (
                  <div className="rounded-xl bg-[#070b14] border border-slate-800 p-3 font-mono text-xs text-amber-300">
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Governing Equation:</div>
                    <div className="text-sm font-bold">{concept.formula}</div>
                    {concept.formulaDescription && (
                      <div className="text-[11px] text-slate-400 mt-1 font-sans">
                        {concept.formulaDescription}
                      </div>
                    )}
                  </div>
                )}

                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Practical Application: </strong>
                  {concept.practicalApplication}
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex flex-wrap gap-1">
                    {concept.governingCodes.map((code, idx) => (
                      <span key={idx} className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-800">
                        {code}
                      </span>
                    ))}
                  </div>

                  {concept.relatedCalculators.length > 0 && (
                    <Link
                      href={`/calculators?tab=beam`}
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" /> Test in Calculator →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
