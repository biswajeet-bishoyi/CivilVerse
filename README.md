# 🌐 CivilVerse — AI-First Civil Engineering Knowledge & Exploration Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/Math-KaTeX-3298DC)](https://katex.org/)

> *"One Universe. Every Structure. Every Engineer."*

**An AI-driven civil engineering encyclopedia, structural diagnostics studio, and interactive computation suite.**

[Live Demo](https://github.com/biswajeet-bishoyi/CivilVerse) • [Report Bug](https://github.com/biswajeet-bishoyi/CivilVerse/issues)

</div>

---

## 🌟 Overview

**CivilVerse** brings together a comprehensive civil engineering knowledge base, structural failure case studies, empirical design calculators, constitutive stress-strain visualizers, and artificial intelligence. Built around **Archie AI**, a multi-agent engineering assistant with photographic structural X-Ray diagnostics, CivilVerse empowers students, consulting engineers, and educators to explore world-changing megaprojects and solve complex engineering problems.

---

## 🚀 Key Features

### 1. 🤖 Archie Engineering AI & Structural X-Ray (`/archie`)
- **Multi-Agent Workspace**: Equipped with Chat Streaming, Plan Decomposer, Execution DAG Telemetry, and Context Engine.
- **4 Persona Modes**: *Senior Structural Consultant*, *Engineering Professor*, *Site Engineer*, and *Standards Auditor*.
- **Photographic Diagnostics**: Upload photos of structural systems to identify structural framing, load path hierarchy, primary materials, and potential vulnerability zones.

### 2. 🏛️ Global Engineering Marvels (`/marvels`)
- **19 Iconic Megaprojects** across 6 core disciplines:
  - **Supertalls:** Burj Khalifa, Merdeka 118, Shanghai Tower, Petronas Towers, Taipei 101.
  - **Bridges & Arches:** Chenab Railway Bridge, Millau Viaduct, Golden Gate Bridge, Akashi Kaikyō, Sydney Harbour Bridge, Brooklyn Bridge.
  - **Dams & Hydrology:** Three Gorges Dam, Itaipu Dam, Hoover Dam, Delta Works (Oosterscheldekering).
  - **Tunnels & Subterranean:** Gotthard Base Tunnel (57 km), Channel Tunnel.
  - **Maritime & Historic:** Panama Canal Expansion, The Roman Pantheon.
- Detailed geotechnical foundations, structural load paths, seismic damping systems, and aerodynamic wind tuning analysis.

### 3. 🧮 Interactive Engineering Calculators Suite (`/calculators`)
- **Beam Reaction & SFD/BMD Solver:** Simply supported and cantilever configurations with dynamic point/UDL load combinations and real-time SVG diagrams.
- **IS 10262:2019 Concrete Mix Proportioning:** Target mean strength ($f'_{ck}$), $w/c$ ratio, water content, coarse/fine aggregate batch weights.
- **Steel Rebar & BBS Estimator:** Unit weight calculations ($ho = D^2 / 162.2$), total steel tonnage, and bar bending schedule cut lengths.
- **Terzaghi Soil Bearing Capacity:** Strip, square, and circular footings with general shear failure factors ($N_c, N_q, N_\gamma$).
- **RCC Column Capacity Solver:** Short axial column design per IS 456 Clause 39.3 ($P_u = 0.4 f_{ck} A_c + 0.67 f_y A_{sc}$).
- **Civil Engineering Unit Converter:** Precision conversions across stress, pressure, moment, force, density, and hydraulic discharge.

### 4. 🔬 Materials Science & Stress-Strain Inspector (`/materials`)
- Constitutive nonlinear models for 10+ materials: Standard Concrete (M25 to M80), **Ultra-High-Performance Concrete (UHPC 180 MPa)**, **Self-Healing Bio-Concrete**, **Fe500D/Fe600 Rebar**, **1860 MPa Prestressing Strands**, **CFRP Composites**, and **Mass Timber (CLT)**.
- Interactive SVG stress-strain ($\sigma - \epsilon$) curves, Young's modulus ($E$), Poisson's ratio, and embodied carbon footprints.

### 5. 📜 International Standards Matrix (`/codes`)
- Side-by-side clause comparison and code cross-referencing between **IS 456:2000 (India)**, **ACI 318-19 (USA)**, and **Eurocode 2 / EN 1992 (Europe)**.

### 6. 📰 Live Infrastructure News Aggregator (`/news`)
- Real-time RSS feeds aggregating research and project updates from *ScienceDaily Civil Engineering*, *MIT CEE*, and *ASCE*.

### 7. 🕸️ Interactive 2D Knowledge Graph (`/graph`)
- Force-directed Canvas graph interconnecting materials, structural systems, standards, and historical failure forensics.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Blueprint CAD Grid Design System, Custom SVG Renderers
- **Icons:** Lucide React
- **Mathematics:** KaTeX TeX Notation Engine

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

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Built with ❤️ for civil engineers, structural designers, and researchers by <a href="https://github.com/biswajeet-bishoyi">Biswajeet Bishoyi</a>
</div>
