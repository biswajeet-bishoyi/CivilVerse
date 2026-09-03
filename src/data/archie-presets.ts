export interface XRaySample {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  analysis: {
    structuralSystem: string;
    dominantLoadPath: string;
    criticalMaterials: string[];
    potentialFailureModes: string[];
    governingDesignCodes: string[];
    constructionSequenceSummary: string;
    safetyFactorGuidelines: string;
    educationalTakeaway: string;
  };
}

export interface ArchieMode {
  id: "tutor" | "structural" | "site" | "standards";
  title: string;
  icon: string;
  tagline: string;
  promptDirective: string;
}

export const ARCHIE_MODES: ArchieMode[] = [
  {
    id: "structural",
    title: "Senior Structural Consultant",
    icon: "ShieldAlert",
    tagline: "Rigorous load path mechanics, finite element intuition, and code limits.",
    promptDirective: "You are Archie acting as a Senior Structural Consultant with 25+ years experience. Emphasize equilibrium, load transfer paths, shear/moment diagrams, deflection criteria, and ductility.",
  },
  {
    id: "tutor",
    title: "Engineering Professor & Tutor",
    icon: "GraduationCap",
    tagline: "Clear first-principles derivations, intuitive analogies, and step-by-step math.",
    promptDirective: "You are Archie acting as an inspiring Civil Engineering Professor. Explain complex mechanics with first principles, intuitive real-world analogies, step-by-step equations, and friendly Socratic questions.",
  },
  {
    id: "site",
    title: "Field & Site Engineer",
    icon: "HardHat",
    tagline: "Practical pouring tips, slump checks, rebar cover, formwork, and OSHA safety.",
    promptDirective: "You are Archie acting as a Seasoned Site Engineer. Focus on practical constructability, concrete compaction, slump tests, clear cover to rebar, formwork stripping times, and on-site troubleshooting.",
  },
  {
    id: "standards",
    title: "Standards & Codes Compliance",
    icon: "FileCheck2",
    tagline: "Cross-comparison across IS 456, ACI 318, Eurocode 2, and AISC 360.",
    promptDirective: "You are Archie acting as a Building Code & Standards Auditor. Cite relevant clauses from IS 456, ACI 318, Eurocode 2, and AISC 360 with exact safety factors and limit states.",
  },
];

export const XRAY_SAMPLES: XRaySample[] = [
  {
    id: "sample-cantilever-stadium",
    name: "Cantilevered Stadium Canopy Roof",
    thumbnail: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80",
    category: "Long-Span Steel Truss",
    analysis: {
      structuralSystem: "Tapered Steel Box-Girder Cantilever with Cable-Backstays",
      dominantLoadPath: "Downward gravity/snow loads create huge hogging moments at the rear mast. Tension is transferred via prestressed upper tie cables to heavy rear anchor pylons, while the bottom flange carries massive axial compression.",
      criticalMaterials: ["High-strength structural steel Grade S460", "Galvanized bridge wire strands (1,770 MPa)", "PTFE-coated fiberglass tensile fabric roof membrane"],
      potentialFailureModes: ["Aerodynamic wind flutter/uplift oscillation", "Lateral torsional buckling of bottom compression flange", "Fatigue cracking at welded cable socket gusset plates"],
      governingDesignCodes: ["AISC 360-16 / EN 1993-1-1 (Steel Design)", "ASCE 7-22 / IS 875 Part 3 (Wind Tunnel Criteria)"],
      constructionSequenceSummary: "1. Cast deep drilled shaft foundations for rear anchor pylons. 2. Erect rear counter-stay towers. 3. Segmentally lift cantilever trusses using mobile lattice cranes. 4. Post-tension stay cables to pre-deflect canopy before releasing temporary shoring.",
      safetyFactorGuidelines: "Overturning factor of safety FOS > 2.0 under extreme wind suction uplift; cable tension limit state $\\phi = 0.45$ of ultimate breaking load.",
      educationalTakeaway: "In long cantilevers, controlling aerodynamic wind vibration and live-load tip deflection governs member sizing far more than simple static gravity yield strength.",
    },
  },
  {
    id: "sample-cable-stayed-bridge",
    name: "Cable-Stayed River Crossing",
    thumbnail: "/images/marvels/millau-viaduct.jpg",
    category: "Cable-Stayed Superstructure",
    analysis: {
      structuralSystem: "Semi-Fan Array Cable-Stayed Bridge with Inverted-Y Concrete Pylons",
      dominantLoadPath: "Deck self-weight and traffic live loads are gathered by stay cables into the masthead, transferring high vertical compression down through the hollow RC pylons into deep drilled caissons.",
      criticalMaterials: ["Grade C60/75 Self-Compacting Concrete", "Parallel wire strand cables with HDPE co-extruded UV sheathing", "Orthotropic steel box deck"],
      potentialFailureModes: ["Rain-wind induced cable vibration", "Pylon buckling under asymmetric span traffic loading", "Fatigue at stay anchorage anchor heads"],
      governingDesignCodes: ["PTI Recommendations for Stay Cable Design", "AASHTO LRFD Bridge Design Specs", "Eurocode 1 & 2"],
      constructionSequenceSummary: "1. Sink ocean/river caissons with non-dispersible underwater concrete. 2. Slipform pylon legs to masthead. 3. Symmetrically balance-cantilever deck segments using derrick cranes while simultaneously tensioning stay pairs.",
      safetyFactorGuidelines: "Cable tension operating safety factor > 2.2 under maximum service limit state combination.",
      educationalTakeaway: "Symmetrical balanced-cantilever erection ensures the pylon experiences zero net overturning moment during construction stages.",
    },
  },
  {
    id: "sample-arch-dam",
    name: "Double-Curvature Concrete Arch Dam",
    thumbnail: "/images/marvels/hoover-dam.jpg",
    category: "Hydraulic Concrete Structure",
    analysis: {
      structuralSystem: "Thin Double-Curvature (Cupola) Arch Dam",
      dominantLoadPath: "Hydrostatic water thrust is transferred horizontally via compressive arch rings and vertically via cantilever action into the solid canyon rock abutments.",
      criticalMaterials: ["Low-heat mass Portland pozzolana concrete (PPC)", "Embedded copper waterstops at contraction joints", "Deep cementitious grout cutoff curtain"],
      potentialFailureModes: ["Abutment rock wedge sliding along geological fault planes", "Thermal contraction tensile cracking at monolith joints", "Cavitation erosion at high-velocity spillway lips"],
      governingDesignCodes: ["USBR Design of Arch Dams", "ICOLD Bulletins on Dam Safety", "IS 6512"],
      constructionSequenceSummary: "1. Divert river via bypass tunnel. 2. Excavate canyon walls down to sound unweathered rock. 3. Pour in 1.5m to 2.0m lifts using internal cooling pipes. 4. Pressure-grout contraction joints after artificial cooling cools the mass to mean ambient temperature.",
      safetyFactorGuidelines: "Sliding safety factor on rock abutments FOS > 2.0 under Normal Pool Level; 1.5 under Maximum Credible Earthquake (MCE).",
      educationalTakeaway: "Arch dams exploit concrete's high compressive strength, requiring 60-70% less concrete volume than an equivalent gravity dam.",
    },
  },
];

export const SUGGESTED_QUERIES = [
  "How does a tuned mass damper work during an earthquake?",
  "Explain the difference between one-way and two-way slab load distribution.",
  "What causes diagonal tension shear cracks in concrete beams at 45 degrees?",
  "How do you calculate the target mean strength of M30 concrete under IS 10262?",
  "What is the difference between General Shear and Punching Shear failure in soil?",
  "Explain why pre-stressing concrete is superior to ordinary RCC for long spans.",
];
