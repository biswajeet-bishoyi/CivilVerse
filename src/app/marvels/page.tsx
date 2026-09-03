"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Filter,
  Search,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MARVELS_DATA, StructureMarvel } from "@/data/marvels";

export default function MarvelsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Skyscraper",
    "Bridge",
    "Dam",
    "Tunnel",
    "Megastructure",
    "Historical",
  ];

  const filteredMarvels = MARVELS_DATA.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.structuralSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.materialsUsed.some((mat) =>
        mat.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Header Banner */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/90 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-3 py-1 text-xs text-blue-300 font-mono mb-4">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
            <span>GLOBAL INFRASTRUCTURE ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Marvels & Megaprojects
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
            In-depth structural anatomy, geotechnical foundations, load path mechanics, and
            construction methodologies of the world's most daring civil engineering achievements.
          </p>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat === "All" ? `All Structures (${MARVELS_DATA.length})` : `${cat}s`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, material, or system..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marvels Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        {filteredMarvels.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <p>No structures found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMarvels.map((marvel) => (
              <Link
                key={marvel.id}
                href={`/marvels/${marvel.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-[#0c1322] overflow-hidden hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
              >
                {/* Image Viewport */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={marvel.heroImage}
                    alt={marvel.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-transparent opacity-80" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 rounded-md bg-blue-950/90 border border-blue-600/50 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 font-mono">
                    {marvel.category}
                  </div>
                  <div className="absolute top-3 right-3 rounded-md bg-slate-900/90 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    {marvel.completionYear}
                  </div>

                  {/* Metric on image bottom */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-200">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="h-3 w-3 text-red-400" />
                      {marvel.location}, {marvel.country}
                    </span>
                    <span className="font-bold text-amber-300">{marvel.heightOrLength}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {marvel.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {marvel.summary}
                    </p>
                  </div>

                  {/* Structural System Highlight */}
                  <div className="rounded-xl bg-blue-950/30 border border-blue-800/40 p-3 text-xs space-y-1">
                    <div className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                      Structural Framing System:
                    </div>
                    <div className="text-slate-200 font-medium line-clamp-2">
                      {marvel.structuralSystem}
                    </div>
                  </div>

                  {/* Key innovations pill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {marvel.materialsUsed.slice(0, 2).map((mat, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                      >
                        {mat.split("(")[0]}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Est: {marvel.estimatedCost}</span>
                    <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Engineering Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
