"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  GraduationCap,
  HardHat,
  FileCheck2,
  Upload,
  Send,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  Circle,
  Loader2,
  PlayCircle,
  Database,
  History,
  MessageSquare,
  ListTodo,
  Activity,
  Sliders,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { ARCHIE_MODES, XRAY_SAMPLES, SUGGESTED_QUERIES, ArchieMode, XRaySample } from "@/data/archie-presets";

interface Message {
  id: string;
  sender: "user" | "archie";
  text: string;
  timestamp: string;
  mode?: string;
}

interface PlanStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "active" | "pending" | "failed";
}

interface ExecutionTask {
  id: string;
  name: string;
  status: "completed" | "running" | "queued" | "failed";
  progress: number;
  durationMs: number;
}

function ArchiePageContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";

  const [activeMode, setActiveMode] = useState<ArchieMode>(ARCHIE_MODES[0]);
  const [workspaceTab, setWorkspaceTab] = useState<"xray" | "chat" | "plan" | "execution" | "context">("xray");

  // X-Ray states
  const [selectedSample, setSelectedSample] = useState<XRaySample>(XRAY_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "archie",
      text: `Greetings, Engineer! I am **Archie**, your AI civil engineering copilot.

*“Archie is not a chatbot. Archie is a junior engineer working alongside you.”*

### Workspace Capabilities:
- **Engineering X-Ray:** Scan any structure to identify load paths, materials, and failure modes.
- **Execution Planner:** Transparent multi-step calculation decomposition (Check the **Plan** tab).
- **Execution Engine:** Live solver telemetry, code compliance checks, and finite element validation (Check the **Execution** tab).
- **Context Engine:** Real-time structural parameters and knowledge graph syncing (Check the **Context** tab).

How can I help you design, simulate, or inspect today?`,
      timestamp: "Just now",
      mode: "structural",
    },
  ]);
  const [inputQuery, setInputQuery] = useState(initialPrompt);
  const [isResponding, setIsResponding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Dynamic Plan & Execution DAG states (BeamLab Multi-Agent Architecture)
  const [planSteps, setPlanSteps] = useState<PlanStep[]>([
    {
      id: "step-1",
      title: "1. Problem Framing & Boundary Conditions",
      description: "Identify structural system, support constraints, and load combination cases.",
      status: "completed",
    },
    {
      id: "step-2",
      title: "2. Differential Equilibrium & Shear/Moment Resolution",
      description: "Compute reactions and integrate dV/dx = -w(x) to locate peak bending moments.",
      status: "completed",
    },
    {
      id: "step-3",
      title: "3. Code Compliance Verification (IS 456 / ACI 318)",
      description: "Verify limit states of collapse (flexure & shear) and serviceability (deflection).",
      status: "completed",
    },
    {
      id: "step-4",
      title: "4. Synthesis & Engineering Recommendations",
      description: "Format cross-section sizing, rebar curtailment, and constructability report.",
      status: "completed",
    },
  ]);

  const [executionTasks, setExecutionTasks] = useState<ExecutionTask[]>([
    {
      id: "task-1",
      name: "FEM Solver Engine: 1D Elastic Beam Kernel",
      status: "completed",
      progress: 100,
      durationMs: 42,
    },
    {
      id: "task-2",
      name: "IS 456:2000 Table 19 / ACI 318-19 Shear Evaluator",
      status: "completed",
      progress: 100,
      durationMs: 18,
    },
    {
      id: "task-3",
      name: "Knowledge Graph Entity Linker (Burj Khalifa & Concrete C80)",
      status: "completed",
      progress: 100,
      durationMs: 12,
    },
  ]);

  const [activeContextData, setActiveContextData] = useState({
    activeSession: "Archie_CivilVerse_v2.4",
    selectedPersona: activeMode.title,
    governingCodes: ["IS 456:2000", "ACI 318-19", "Eurocode 2", "IS 10262:2019"],
    activeStructureTarget: selectedSample.name,
    structuralClassification: selectedSample.analysis.structuralSystem,
    primaryMaterial: selectedSample.analysis.criticalMaterials[0] || "Reinforced Concrete",
    currentSafetyFactorTarget: 3.0,
    knowledgeGraphNodesConnected: 19,
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isResponding]);

  const handleScanSample = (sample: XRaySample) => {
    setSelectedSample(sample);
    setCustomImage(null);
    setIsScanning(true);
    setScanProgress(0);

    setActiveContextData((prev) => ({
      ...prev,
      activeStructureTarget: sample.name,
      structuralClassification: sample.analysis.structuralSystem,
      primaryMaterial: sample.analysis.criticalMaterials[0] || "Structural Steel / Concrete",
    }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 200);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setIsScanning(true);
        setScanProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 25;
          setScanProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsScanning(false);
          }
        }, 250);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isResponding) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsResponding(true);

    // Update Plan tab dynamically (BeamLab Architecture)
    setPlanSteps([
      {
        id: "step-1",
        title: "1. Parsing Engineering Prompt & Parameter Extraction",
        description: `Deconstruct: "${query.substring(0, 45)}..." into mechanics and boundary conditions.`,
        status: "active",
      },
      {
        id: "step-2",
        title: "2. Structural Solver Execution & Equilibrium Resolution",
        description: "Calculate reactions, stress distributions, and limit state verification.",
        status: "pending",
      },
      {
        id: "step-3",
        title: "3. Standards Audit & Code Safety Factor Check",
        description: `Apply clauses from ${activeContextData.governingCodes.join(", ")}.`,
        status: "pending",
      },
      {
        id: "step-4",
        title: "4. Output Formatting & Physical Analogy Synthesis",
        description: `Assemble ${activeMode.title} guidance with formulas and diagrams.`,
        status: "pending",
      },
    ]);

    setExecutionTasks([
      {
        id: "task-1",
        name: "BeamLab Mathematical Solver Kernel",
        status: "running",
        progress: 45,
        durationMs: 34,
      },
      {
        id: "task-2",
        name: "Code Compliance Validator Engine",
        status: "queued",
        progress: 0,
        durationMs: 0,
      },
    ]);

    // Simulate Archie AI response generation based on active persona
    setTimeout(() => {
      let responseText = "";
      const qLower = query.toLowerCase();

      if (qLower.includes("shear") || qLower.includes("moment") || qLower.includes("beam")) {
        responseText = `### Structural Analysis Breakdown: Flexure & Shear in Beams

1. **Differential Equilibrium:**
   $$\\frac{dM}{dx} = V(x), \\quad \\frac{dV}{dx} = -w(x)$$
   - **Key Principle:** The maximum bending moment strictly occurs where the shear force passes through zero ($V = 0$).
   - For a simply supported beam with Uniformly Distributed Load ($w$):
     $$M_{max} = \\frac{w L^2}{8}, \\quad V_{max} = \\frac{w L}{2}$$

2. **Rebar Placement (IS 456 / ACI 318):**
   - **Tension Zone:** Place primary longitudinal steel at the bottom fiber for sagging moments (midspan) and at top fiber for hogging moments (over supports in continuous beams).
   - **Shear Links (Stirrups):** Required close to supports where shear stress $\\tau_v = V_u / (b d)$ exceeds allowable concrete shear strength $\\tau_c$. Vertical stirrups resist $45^\\circ$ diagonal tension cracks.

3. **${activeMode.title} Recommendation:**
   Ensure minimum stirrup spacing does not exceed $0.75 d$ or $300\\text{ mm}$ to maintain shear ductility.`;
      } else if (qLower.includes("concrete") || qLower.includes("mix") || qLower.includes("water-cement") || qLower.includes("m25") || qLower.includes("m30")) {
        responseText = `### Concrete Mix Design & Durability Analysis

1. **Target Mean Compressive Strength ($f'_{ck}$):**
   $$f'_{ck} = f_{ck} + 1.65 \\cdot s$$
   - For **M25 Concrete** ($s = 4.0\\text{ MPa}$): $f'_{ck} = 25 + 1.65(4.0) = 31.6\\text{ N/mm}^2$
   - For **M30 Concrete** ($s = 5.0\\text{ MPa}$): $f'_{ck} = 30 + 1.65(5.0) = 38.25\\text{ N/mm}^2$

2. **Water-Cement ($w/c$) Ratio Rules:**
   - Maximum $w/c$ ratio for Moderate exposure = **0.50** (IS 456 Table 5).
   - Maximum $w/c$ ratio for Severe/Marine exposure = **0.45**.
   - Minimum cement content = $300\\text{ to }320\\text{ kg/m}^3$.

3. **Practical Engineering Observation (${activeMode.title}):**
   Never add extra water on site to increase slump. Utilize a polycarboxylate ether (PCE) superplasticizer to achieve a 125 mm slump without increasing the $w/c$ ratio.`;
      } else if (qLower.includes("terzaghi") || qLower.includes("bearing") || qLower.includes("soil") || qLower.includes("foundation")) {
        responseText = `### Geotechnical Evaluation: Terzaghi Bearing Capacity

1. **Ultimate Bearing Equation:**
   $$q_{ult} = c N_c + \\gamma D_f N_q + 0.5 \\gamma B N_\\gamma$$
   - **Cohesion term ($c N_c$):** Governs in clay soils.
   - **Surcharge term ($\\gamma D_f N_q$):** Increases bearing capacity with embedment depth ($D_f$).
   - **Width term ($0.5 \\gamma B N_\\gamma$):** Provides higher capacity for wider footings ($B$) in sands.

2. **Safe Bearing Capacity ($q_{safe}$):**
   $$q_{safe} = \\frac{q_{ult} - \\gamma D_f}{\\text{FOS}} + \\gamma D_f \\quad (\\text{with FOS } \\ge 3.0)$$

3. **Failure Mechanism Notice:**
   Watch for water table rise within depth $B$ below the footing, which reduces the soil effective unit weight $\\gamma'$ by roughly 50%.`;
      } else {
        responseText = `### Engineering Evaluation (${activeMode.title})

Regarding your query: **"${query}"**

1. **First-Principles Mechanical Formulation:**
   In civil and structural systems, equilibrium $(\\sum F_x = 0, \\sum F_y = 0, \\sum M = 0)$ and strain compatibility dictate the internal stress distribution.

2. **Governing Code Checks:**
   - **Limit State of Collapse:** Factored ultimate loads ($1.5 DL + 1.5 LL$ per IS 456 or $1.2 D + 1.6 L$ per ACI 318).
   - **Limit State of Serviceability:** Deflection limits ($\le L/250$ to $L/350$) and maximum crack width criteria ($\le 0.3\\text{ mm}$).

3. **Recommendations:**
   You can inspect the active decomposed steps in the **Plan** tab, solver latency in the **Execution** tab, or run the BeamLab calculator suite for numerical verification.`;
      }

      const archieMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: "archie",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode: activeMode.id,
      };

      setMessages((prev) => [...prev, archieMsg]);
      setIsResponding(false);

      // Complete the plan steps
      setPlanSteps((prev) =>
        prev.map((s) => ({
          ...s,
          status: "completed",
        }))
      );

      setExecutionTasks([
        {
          id: "task-1",
          name: "BeamLab Mathematical Solver Kernel",
          status: "completed",
          progress: 100,
          durationMs: 38,
        },
        {
          id: "task-2",
          name: "Code Compliance Validator Engine",
          status: "completed",
          progress: 100,
          durationMs: 24,
        },
      ]);
    }, 700);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-blueprint-pattern pb-16">
      {/* Header Bar */}
      <div className="border-b border-blue-900/40 bg-[#0c1424]/80 backdrop-blur-md sticky top-16 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              <BrainCircuit className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white font-mono">
                  ARCHIE <span className="text-blue-400">ENGINEERING AI</span>
                </h1>
                <span className="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-800">
                  BeamLab Multi-Agent v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Persona: <strong className="text-blue-300">{activeMode.title}</strong>
              </p>
            </div>
          </div>

          {/* Persona selector tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#080d18] p-1 rounded-xl border border-slate-800 text-xs">
            {ARCHIE_MODES.map((mode) => {
              const isSelected = activeMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode);
                    setActiveContextData((prev) => ({ ...prev, selectedPersona: mode.title }));
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  {mode.id === "structural" && <ShieldAlert className="h-3.5 w-3.5" />}
                  {mode.id === "tutor" && <GraduationCap className="h-3.5 w-3.5" />}
                  {mode.id === "site" && <HardHat className="h-3.5 w-3.5" />}
                  {mode.id === "standards" && <FileCheck2 className="h-3.5 w-3.5" />}
                  <span>{mode.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* BeamLab Multi-Tab Workspace Switcher */}
        <div className="flex flex-wrap border-b border-slate-800 mb-6 font-mono text-xs sm:text-sm gap-1 sm:gap-4">
          <button
            onClick={() => setWorkspaceTab("xray")}
            className={`flex items-center gap-2 pb-3 px-3 sm:px-4 border-b-2 font-bold transition-all ${
              workspaceTab === "xray"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="h-4 w-4 text-amber-400" />
            <span>Engineering X-Ray</span>
            <span className="hidden sm:inline rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] text-amber-300">
              Visual AI
            </span>
          </button>

          <button
            onClick={() => setWorkspaceTab("chat")}
            className={`flex items-center gap-2 pb-3 px-3 sm:px-4 border-b-2 font-bold transition-all ${
              workspaceTab === "chat"
                ? "border-blue-400 text-blue-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat Stream</span>
          </button>

          <button
            onClick={() => setWorkspaceTab("plan")}
            className={`flex items-center gap-2 pb-3 px-3 sm:px-4 border-b-2 font-bold transition-all ${
              workspaceTab === "plan"
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ListTodo className="h-4 w-4 text-cyan-400" />
            <span>Plan ({planSteps.filter((s) => s.status === "completed").length}/{planSteps.length})</span>
          </button>

          <button
            onClick={() => setWorkspaceTab("execution")}
            className={`flex items-center gap-2 pb-3 px-3 sm:px-4 border-b-2 font-bold transition-all ${
              workspaceTab === "execution"
                ? "border-indigo-400 text-indigo-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Activity className="h-4 w-4 text-indigo-400" />
            <span>Execution DAG</span>
          </button>

          <button
            onClick={() => setWorkspaceTab("context")}
            className={`flex items-center gap-2 pb-3 px-3 sm:px-4 border-b-2 font-bold transition-all ${
              workspaceTab === "context"
                ? "border-emerald-400 text-emerald-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="h-4 w-4 text-emerald-400" />
            <span>Context Engine</span>
          </button>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* TAB 1: ENGINEERING X-RAY */}
        {/* ----------------------------------------------------------- */}
        {workspaceTab === "xray" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-5 shadow-xl cad-corner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-amber-400" />
                    <span>X-RAY VISUAL SCANNER</span>
                  </div>
                  {isScanning ? (
                    <span className="flex items-center gap-1.5 text-xs text-amber-400 font-mono animate-pulse">
                      <RefreshCw className="h-3 w-3 animate-spin" /> Scanning ({scanProgress}%)
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Scan Locked
                    </span>
                  )}
                </div>

                {/* Viewport */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-blue-900/60 bg-black">
                  <img
                    src={customImage || selectedSample.thumbnail}
                    alt="Structure Under X-Ray"
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      isScanning ? "opacity-40" : "opacity-85"
                    }`}
                  />
                  <div className="absolute inset-0 bg-blueprint-lines bg-grid-md opacity-30 pointer-events-none" />

                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-beam" />
                  )}

                  <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-800/60">
                    TARGET: {selectedSample.name.toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-amber-300 bg-black/60 px-2 py-0.5 rounded border border-amber-800/60">
                    LOAD PATH IDENTIFIED
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-xs text-slate-400 font-mono mb-2 flex items-center justify-between">
                    <span>STRUCTURE SAMPLES OR UPLOAD:</span>
                    <label className="cursor-pointer text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1">
                      <Upload className="h-3 w-3" /> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {XRAY_SAMPLES.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => handleScanSample(sample)}
                        className={`rounded-lg p-1.5 border text-left transition-all ${
                          selectedSample.id === sample.id && !customImage
                            ? "border-amber-400 bg-amber-500/10 shadow-md"
                            : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                        }`}
                      >
                        <img
                          src={sample.thumbnail}
                          alt={sample.name}
                          className="h-14 w-full object-cover rounded mb-1"
                        />
                        <div className="text-[11px] font-bold text-white line-clamp-1">
                          {sample.name}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">{sample.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 shadow-xl space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                      Archie Engineering X-Ray Report
                    </span>
                    <button
                      onClick={() => {
                        setWorkspaceTab("chat");
                        handleSendMessage(
                          `Can you give me more in-depth calculations on the ${selectedSample.name} structural system and load transfer paths?`
                        );
                      }}
                      className="text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" /> Ask Archie about this →
                    </button>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mt-1">
                    {selectedSample.name}
                  </h2>
                  <p className="text-xs text-blue-300 font-mono mt-0.5">
                    Classification: {selectedSample.analysis.structuralSystem}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-950/40 border border-blue-800/50 p-4">
                  <div className="text-xs font-mono font-bold text-blue-300 uppercase flex items-center gap-1.5 mb-1.5">
                    <Sliders className="h-3.5 w-3.5" /> Dominant Load Path
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {selectedSample.analysis.dominantLoadPath}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-300 uppercase mb-2">
                      Critical Materials
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {selectedSample.analysis.criticalMaterials.map((mat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5">
                    <div className="text-[11px] font-mono font-bold text-amber-300 uppercase mb-2">
                      Critical Failure Modes
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {selectedSample.analysis.potentialFailureModes.map((fm, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5">⚠</span>
                          <span>{fm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white font-mono">Construction Sequence: </strong>
                    <span className="text-slate-300">
                      {selectedSample.analysis.constructionSequenceSummary}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono">Governing Codes:</span>
                    {selectedSample.analysis.governingDesignCodes.map((code, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700"
                      >
                        {code}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-xl bg-emerald-950/30 border border-emerald-800/40 p-3 text-xs text-emerald-200">
                    <strong className="text-emerald-300 font-mono">Archie's Takeaway: </strong>
                    {selectedSample.analysis.educationalTakeaway}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 2: ARCHIE CHAT STREAM */}
        {/* ----------------------------------------------------------- */}
        {workspaceTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col h-[650px] rounded-2xl border border-blue-500/30 bg-[#0c1424] shadow-2xl overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      {msg.sender === "archie" ? (
                        <>
                          <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                            A
                          </div>
                          <span className="text-xs font-mono font-bold text-blue-400">Archie AI</span>
                        </>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">You (Engineer)</span>
                      )}
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`relative max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20"
                          : "bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none prose-invert"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {msg.sender === "archie" && (
                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="mt-2 text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-mono pt-1 border-t border-slate-800"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy Response
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isResponding && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold animate-pulse">
                        A
                      </div>
                      <span className="text-xs font-mono text-blue-400">Archie is computing...</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-slate-900 p-4 border border-slate-800 text-xs text-slate-400 flex items-center gap-2 font-mono">
                      <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
                      Deconstructing execution plan and computing limit states...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-slate-800 bg-[#080d18] p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder={`Ask Archie (${activeMode.title})... e.g. "Calculate shear capacity of 300x500 M25 beam"`}
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isResponding}
                    className="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-[#0c1322] p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                  <Sparkles className="h-4 w-4" /> Suggested Prompts
                </div>
                <div className="space-y-2">
                  {SUGGESTED_QUERIES.map((queryText, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(queryText)}
                      className="w-full text-left rounded-lg bg-slate-900/80 hover:bg-blue-950/40 p-2.5 border border-slate-800 hover:border-blue-700/50 text-xs text-slate-300 transition-all"
                    >
                      "{queryText}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 3: EXECUTION PLAN TAB (BeamLab Architecture) */}
        {/* ----------------------------------------------------------- */}
        {workspaceTab === "plan" && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-blue-500/30 bg-[#0c1424] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-cyan-400" />
                  Archie Step-by-Step Execution Plan
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Transparent chain-of-thought and task decomposition pipeline.
                </p>
              </div>
              <span className="rounded bg-cyan-950 px-2.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-800">
                STATUS: SYNCED
              </span>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 py-2">
              {planSteps.map((step) => (
                <div key={step.id} className="relative pl-6">
                  <div
                    className={`absolute -left-[11px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-[#0c1424] ${
                      step.status === "completed"
                        ? "text-emerald-400"
                        : step.status === "active"
                        ? "text-blue-400"
                        : step.status === "failed"
                        ? "text-rose-400"
                        : "text-slate-500 border border-slate-700"
                    }`}
                  >
                    {step.status === "completed" && <CheckCircle2 className="w-5 h-5" />}
                    {step.status === "active" && <Loader2 className="w-4 h-4 animate-spin" />}
                    {step.status === "pending" && <Circle className="w-3 h-3" />}
                    {step.status === "failed" && <AlertCircle className="w-5 h-5" />}
                  </div>

                  <div className="flex flex-col bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <span
                      className={`text-sm font-bold font-mono ${
                        step.status === "active" ? "text-blue-300" : "text-white"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 4: EXECUTION DAG & SCHEDULER TAB (BeamLab Architecture) */}
        {/* ----------------------------------------------------------- */}
        {workspaceTab === "execution" && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-400" />
                  Execution Queue & Solver Telemetry
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  BeamLab Kernel tool invocations, FE solvers, and compliance agents.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> All Tools Ready
              </span>
            </div>

            <div className="space-y-4">
              {executionTasks.map((task) => (
                <div key={task.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-sm text-white font-semibold flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-indigo-400" /> {task.name}
                    </span>
                    <span className="text-emerald-400">{task.status.toUpperCase()} ({task.durationMs}ms)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 transition-all duration-300 ease-out"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 5: CONTEXT ENGINE TAB (BeamLab Architecture) */}
        {/* ----------------------------------------------------------- */}
        {workspaceTab === "context" && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-[#0c1424] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-400" />
                  Archie Context Engine & Knowledge Graph State
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Active structural parameters, load vectors, and connected ontology entities.
                </p>
              </div>
              <span className="text-xs font-mono text-blue-400">SYNC: 100%</span>
            </div>

            <div className="bg-[#080d18] border border-slate-800 rounded-xl p-5 text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(activeContextData, null, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArchiePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Archie AI...</div>}>
      <ArchiePageContent />
    </Suspense>
  );
}
