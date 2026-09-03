# 🏛️ CivilVerse — AI-First Civil Engineering Knowledge & Exploration Platform

> *"One Universe. Every Structure. Every Engineer."*

CivilVerse fuses a rich civil engineering encyclopedia, 19 iconic global megaproject case studies, an interactive engineering calculator suite (SFD/BMD, IS 10262 Concrete Mix, Rebar BBS, Terzaghi Soil Bearing), Archie AI with Engineering X-Ray, an interactive 2D Knowledge Graph, a Materials Science Database with constitutive stress-strain visualizers, an International Standards Matrix (IS 456 vs ACI 318 vs Eurocode 2), and a Live Infrastructure News Aggregator.

---

## 🚀 Key Features

### 1. 🧠 Archie Engineering AI & X-Ray (`/archie`)
- Multi-agent workspace with **Engineering X-Ray**, **Chat Stream**, **Plan Decomposer**, **Execution DAG / Telemetry**, and **Context Engine**.
- 4 Persona Modes: *Senior Structural Consultant*, *Engineering Professor*, *Site Engineer*, and *Standards Auditor*.
- Photographic structural diagnostics identifying framing, dominant load paths, materials, and safety factors.

### 2. 🏛️ Global Engineering Marvels (`/marvels`)
- **19 Iconic Megaprojects** across 6 engineering domains:
  - **Supertalls:** Burj Khalifa, Merdeka 118, Shanghai Tower, Petronas Towers, Taipei 101.
  - **Bridges & Arches:** Chenab Railway Bridge, Millau Viaduct, Golden Gate Bridge, Akashi Kaikyō, Sydney Harbour Bridge, Brooklyn Bridge.
  - **Dams & Hydrology:** Three Gorges Dam, Itaipu Dam, Hoover Dam, Delta Works (Oosterscheldekering).
  - **Tunnels & Subterranean:** Gotthard Base Tunnel (57 km), Channel Tunnel.
  - **Maritime & Historic:** Panama Canal Expansion, The Roman Pantheon.
- Full geotechnical, structural framing, and load path case studies.

### 3. 🧮 Interactive Engineering Calculators Suite (`/calculators`)
- **Simply Supported & Cantilever Beam Solver:** Live reactions, point loads, UDLs, and dynamic SVG Shear Force (SFD) & Bending Moment (BMD) diagrams.
- **IS 10262:2019 Concrete Mix Proportioning:** Target mean strength ($f'_{ck}$), $w/c$ ratio, water content, coarse/fine aggregate weights.
- **Steel Rebar & BBS Estimator:** Weight per meter ($\rho = D^2 / 162.2$), total steel tonnage, and cutting lengths.
- **Terzaghi Soil Bearing Capacity:** Strip, square, and circular footings with general shear failure factors ($N_c, N_q, N_\gamma$).
- **RCC Column Capacity Solver:** Short axial column design per IS 456 Cl 39.3 ($P_u = 0.4 f_{ck} A_c + 0.67 f_y A_{sc}$).
- **Civil Engineering Unit Converter:** Stress, pressure, moment, force, density, and flow rate.

### 4. 📚 Centralized Data Library Engine (`/library`)
- **Formulas Codex:** 50+ civil engineering formulas across 6 disciplines with LaTeX rendering and parameter definitions.
- **Server API Query Layer:** Decoupled, paginated, and cached endpoints (`/api/library/formulas`, `/api/library/marvels`).

### 5. 🔬 Materials Science & Stress-Strain Inspector (`/materials`)
- Constitutive models for 10+ materials: Standard Concrete (M25 to M80), **UHPC (180 MPa)**, **Self-Healing Bio-Concrete**, **Fe500D/Fe600 Rebar**, **1860 MPa PT Strands**, **CFRP**, and **Mass Timber (CLT)**.
- Interactive SVG stress-strain curves ($\sigma - \epsilon$), Young's modulus ($E$), Poisson's ratio, and embodied carbon footprints.

### 6. ⚖️ International Standards Matrix (`/codes`)
- Side-by-side clause comparison across **IS 456:2000 (India)**, **ACI 318-19 (USA)**, and **Eurocode 2 / EN 1992 (Europe)**.

### 7. 📰 Live Infrastructure News Aggregator (`/news`)
- Real-time RSS feeds from global engineering research relays (*ScienceDaily Civil Engineering*, *MIT CEE*, *ASCE*) with a live breaking ticker.

### 8. 🕸️ Interactive Knowledge Graph (`/graph`)
- 2D Canvas force-directed graph mapping concepts, materials, structures, codes, and solvers.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Blueprint CAD Grid Design System, Custom SVG Renderers
- **Icons:** Lucide React
- **Mathematics:** KaTeX TeX Notation

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/biswajeet-bishoyi/CivilVerse.git
cd CivilVerse

# Install dependencies
npm install

# Run development server (Port 3030)
npm run dev

# Open in browser
http://localhost:3030
```

---

## 📜 License
MIT License. Built for civil engineers, structural designers, researchers, and students worldwide.
