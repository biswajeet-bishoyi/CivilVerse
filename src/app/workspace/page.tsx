"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Calculator,
  Compass,
  Building2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Download,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { MARVELS_DATA } from "@/data/marvels";
import { COURSES_DATA } from "@/data/courses";

interface SavedCalc {
  id: string;
  tab: string;
  date: string;
  summary: string;
}

export default function WorkspacePage() {
  const [savedCalcs, setSavedCalcs] = useState<SavedCalc[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    const calcs = JSON.parse(localStorage.getItem("civilverse_saved_calcs") || "[]");
    setSavedCalcs(calcs);

    const progress = JSON.parse(localStorage.getItem("civilverse_course_progress") || "{}");
    setCourseProgress(progress);
  }, []);

  const handleDeleteCalc = (id: string) => {
    const updated = savedCalcs.filter((c) => c.id !== id);
    setSavedCalcs(updated);
    localStorage.setItem("civilverse_saved_calcs", JSON.stringify(updated));
  };

  const handleClearAllCalcs = () => {
    if (confirm("Clear all saved calculation records?")) {
      setSavedCalcs([]);
      localStorage.removeItem("civilverse_saved_calcs");
    }
  };

  const totalLessons = COURSES_DATA.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = Object.keys(courseProgress).length;
  const progressPct = Math.round((completedCount / totalLessons) * 100) || 0;

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/90 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3 py-1 text-xs text-blue-300 font-mono mb-4">
            <Bookmark className="h-3.5 w-3.5 text-blue-400" />
            <span>ENGINEER WORKSPACE & SAVED CALCULATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Workspace & Engineering Notebook
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
            Access your saved structural calculations, curriculum quiz completion history, and
            research notes in one unified workspace.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Progress & Overall Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 shadow-xl font-mono">
            <div className="text-xs text-blue-400 font-bold uppercase mb-1">
              Curriculum Progress
            </div>
            <div className="text-3xl font-extrabold text-white">{progressPct}%</div>
            <div className="text-xs text-slate-400 mt-2">
              {completedCount} of {totalLessons} Lessons Mastered
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-[#0c1424] p-6 shadow-xl font-mono">
            <div className="text-xs text-amber-400 font-bold uppercase mb-1">
              Saved Calculations
            </div>
            <div className="text-3xl font-extrabold text-white">{savedCalcs.length}</div>
            <div className="text-xs text-slate-400 mt-2">
              Ready for Export or Reloading in Solvers
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-[#0c1424] p-6 shadow-xl font-mono">
            <div className="text-xs text-emerald-400 font-bold uppercase mb-1">
              Archie AI Copilot
            </div>
            <div className="text-3xl font-extrabold text-white">Active</div>
            <div className="text-xs text-slate-400 mt-2">
              Knowledge Graph Synced
            </div>
          </div>
        </div>

        {/* Section 1: Saved Calculations Records */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white font-mono">
                Saved Engineering Calculations ({savedCalcs.length})
              </h2>
            </div>
            {savedCalcs.length > 0 && (
              <button
                onClick={handleClearAllCalcs}
                className="text-xs text-rose-400 hover:underline font-mono"
              >
                Clear All
              </button>
            )}
          </div>

          {savedCalcs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-[#0c1322] p-8 text-center text-slate-400 text-xs">
              <p>No saved calculations yet.</p>
              <Link
                href="/calculators"
                className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-colors font-mono"
              >
                Go to Calculators & Save Your First Run
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCalcs.map((calc) => (
                <div
                  key={calc.id}
                  className="rounded-xl border border-slate-800 bg-[#0c1322] p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono text-blue-300 border border-blue-800 uppercase">
                        {calc.tab} Calculator
                      </span>
                      <p className="text-xs font-mono text-slate-200 mt-2">{calc.summary}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCalc(calc.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Saved on: {calc.date}</span>
                    <Link
                      href={`/calculators?tab=${calc.tab}`}
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Open Solver <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Course Progress & Badges */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white font-mono">
              Curriculum Mastery & Quiz Records
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COURSES_DATA.map((course) => {
              const lessonsInCourse = course.lessons.map((l) => l.id);
              const completedInCourse = lessonsInCourse.filter((id) => courseProgress[id]?.completed);
              const isAllDone =
                completedInCourse.length === lessonsInCourse.length && lessonsInCourse.length > 0;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-800 bg-[#0c1322] p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        {course.category}
                      </span>
                      {isAllDone && (
                        <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-300 font-mono border border-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {completedInCourse.length} / {lessonsInCourse.length} Lessons Finished
                    </p>
                  </div>

                  <Link
                    href={`/learn/${course.slug}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 py-2.5 text-xs font-mono text-emerald-400 border border-slate-800 transition-all font-bold"
                  >
                    <span>{isAllDone ? "Review Course" : "Continue Course"} →</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
