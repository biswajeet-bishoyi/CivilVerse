"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  TrendingUp,
  Radio,
  RefreshCw,
  Search,
  Bookmark,
  ExternalLink,
  Sparkles,
  Layers,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { LiveNewsItem } from "@/app/api/news/route";

export default function NewsPage() {
  const [news, setNews] = useState<LiveNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [tickerIndex, setTickerIndex] = useState(0);

  const fetchLiveNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        setNews(data.news || []);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error("Error fetching live news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchLiveNews, 300000);
    return () => clearInterval(interval);
  }, []);

  // Ticker animation timer
  useEffect(() => {
    if (news.length === 0) return;
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % news.length);
    }, 4500);
    return () => clearInterval(tickerTimer);
  }, [news]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ["All", "Materials", "Megaprojects", "Structural", "Geotechnical", "Sustainability", "AI & Tech"];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-20">
      {/* Live Breaking News Ticker */}
      {news.length > 0 && (
        <div className="border-b border-blue-900/50 bg-[#080d18] px-4 py-2 text-xs font-mono">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="flex items-center gap-1.5 rounded bg-rose-950 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-800 animate-pulse uppercase tracking-wider shrink-0">
                <Radio className="h-3 w-3 text-rose-400" /> LIVE FEED
              </span>
              <p className="text-slate-200 truncate transition-all duration-300">
                <strong className="text-blue-400">[{news[tickerIndex]?.source}]: </strong>
                {news[tickerIndex]?.title}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px] shrink-0">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>Synced {lastRefreshed || "Just now"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="border-b border-blue-900/30 bg-[#0c1424]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-blue-950 px-2.5 py-1 text-xs font-bold text-blue-300 border border-blue-800/60 font-mono mb-3">
                <TrendingUp className="h-3.5 w-3.5 text-blue-400" /> GLOBAL INFRASTRUCTURE INTELLIGENCE
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                LIVE <span className="text-blue-400">CIVIL ENGINEERING</span> DISPATCH
              </h1>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Real-time research papers, mega-structural breakthroughs, geotechnical audits, and material science innovations.
              </p>
            </div>

            <button
              onClick={fetchLiveNews}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/20 font-mono"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isLoading ? "Fetching Live RSS..." : "Refresh Live Feed"}</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold font-mono transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live headlines & topics..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main News Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading && news.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="h-8 w-8 text-blue-400 animate-spin mx-auto" />
            <p className="text-sm font-mono text-slate-300">Connecting to global civil engineering RSS relays...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-mono text-sm">
            No live articles matching your filter. Try searching for "concrete", "bridge", or "seismic".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-blue-900/40 bg-[#0c1424] p-6 shadow-xl hover:border-blue-500/50 hover:shadow-2xl transition-all flex flex-col justify-between group cad-corner"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-300 border border-blue-800/60 uppercase">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(item.pubDate).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <button
                          onClick={() => toggleBookmark(item.id)}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                            isBookmarked ? "text-amber-400" : "text-slate-500 hover:text-white"
                          }`}
                          title={isBookmarked ? "Remove Bookmark" : "Save to Workspace"}
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="text-slate-400 text-[11px] truncate max-w-[150px]">
                      Source: <strong className="text-slate-300">{item.source}</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500">{item.readTime}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Read</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
