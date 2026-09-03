"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  ChevronRight,
  RotateCcw,
  Trophy,
} from "lucide-react";
import confetti from "canvas-confetti";
import { COURSES_DATA, Course, Lesson, QuizQuestion } from "@/data/courses";

export default function CourseViewerPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const course = COURSES_DATA.find((c) => c.slug === courseId || c.id === courseId);

  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-blueprint-pattern p-12 text-center text-slate-400">
        <p>Course not found.</p>
        <Link href="/learn" className="text-blue-400 hover:underline mt-4 inline-block">
          Return to Learn Center
        </Link>
      </div>
    );
  }

  const currentLesson: Lesson = course.lessons[activeLessonIndex] || course.lessons[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);

    // Calculate score
    let correctCount = 0;
    currentLesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === currentLesson.quiz.length && correctCount > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Save progress in local storage
    const progressData = JSON.parse(localStorage.getItem("civilverse_course_progress") || "{}");
    progressData[currentLesson.id] = {
      completed: true,
      score: `${correctCount}/${currentLesson.quiz.length}`,
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("civilverse_course_progress", JSON.stringify(progressData));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Top Bar */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/80 backdrop-blur-md sticky top-16 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Curriculum
          </Link>

          <span className="text-xs font-mono text-emerald-400 font-bold">
            {course.title}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Lesson Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-5 space-y-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                COURSE MODULES ({course.lessons.length})
              </div>

              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveLessonIndex(idx);
                        setSelectedAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className={`w-full text-left rounded-xl p-3 text-xs transition-all flex items-start justify-between gap-2 ${
                        isActive
                          ? "bg-blue-600/20 border border-blue-500/50 text-white shadow-md font-bold"
                          : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:bg-slate-800/80"
                      }`}
                    >
                      <div>
                        <div className="text-[10px] text-blue-400 font-mono">
                          Lesson {idx + 1} • {lesson.durationMinutes} min
                        </div>
                        <div className="mt-0.5">{lesson.title}</div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 mt-1 transition-transform ${
                          isActive ? "text-blue-400 translate-x-1" : "text-slate-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Archie Tutor Callout */}
            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                <Sparkles className="h-4 w-4" /> Archie AI Study Companion
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stuck on a derivation or quiz problem? Archie can break down the mechanics step-by-step
                with intuitive physical analogies.
              </p>
              <Link
                href={`/archie?prompt=${encodeURIComponent(`I am studying ${currentLesson.title}. Can you explain the core concepts from first principles?`)}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 hover:underline"
              >
                <span>Ask Archie about Lesson {activeLessonIndex + 1} →</span>
              </Link>
            </div>
          </div>

          {/* Right Main Panel: Lesson Content + Quiz */}
          <div className="lg:col-span-8 space-y-8">
            {/* Lesson Reading Content */}
            <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 sm:p-8 space-y-6 shadow-xl cad-corner">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                  Lesson {activeLessonIndex + 1} of {course.lessons.length}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {currentLesson.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {currentLesson.summary}
                </p>
              </div>

              {/* Lesson Markdown & Formulations */}
              <div className="rounded-xl bg-[#080d18] border border-slate-800 p-5 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {currentLesson.contentMarkdown}
              </div>

              {/* Key Formulas Summary */}
              {currentLesson.keyFormulas && currentLesson.keyFormulas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold text-amber-300 uppercase">
                    Governing Equations & Formulas:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.keyFormulas.map((kf, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 space-y-1 font-mono"
                      >
                        <div className="text-[11px] text-slate-400">{kf.name}</div>
                        <div className="text-sm font-bold text-amber-300">{kf.formula}</div>
                        <div className="text-[10px] text-slate-500 font-sans">{kf.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Chapter Quiz */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-mono uppercase">
                    Knowledge Check & Quiz
                  </h3>
                </div>
                {quizSubmitted && (
                  <button
                    onClick={handleResetQuiz}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
                  >
                    <RotateCcw className="h-3 w-3" /> Retry Quiz
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {currentLesson.quiz.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="rounded-xl bg-[#080d18] border border-slate-800/80 p-5 space-y-3"
                    >
                      <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                        <span className="text-blue-400 font-mono">Q{qIndex + 1}.</span>
                        <span>{q.question}</span>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let optionClass =
                            "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optionClass =
                                "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold";
                            } else if (isOptionSelected && !isCorrect) {
                              optionClass = "bg-rose-950/50 border-rose-500 text-rose-200";
                            }
                          } else if (isOptionSelected) {
                            optionClass =
                              "bg-blue-600/30 border-blue-500 text-blue-200 font-semibold";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left rounded-lg p-3 text-xs border transition-all flex items-center justify-between ${optionClass}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                              )}
                              {quizSubmitted && isOptionSelected && !isCorrect && (
                                <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation and Archie Tip after Submission */}
                      {quizSubmitted && (
                        <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-2">
                          <p className="text-slate-300">
                            <strong className="text-white">Explanation: </strong>
                            {q.explanation}
                          </p>
                          <div className="rounded-lg bg-blue-950/30 border border-blue-800/40 p-2.5 text-blue-200 flex items-start gap-2">
                            <Sparkles className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                            <span>
                              <strong>Archie's Tip: </strong>
                              {q.archieTip}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Submit button */}
                {!quizSubmitted && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < currentLesson.quiz.length}
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-3 text-xs font-bold text-white transition-all font-mono shadow-lg shadow-emerald-600/20"
                  >
                    Submit Answers & View Archie Explanations
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
