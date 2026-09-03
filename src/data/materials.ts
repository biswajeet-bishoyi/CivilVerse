export interface EngineeringMaterial {
  id: string;
  name: string;
  category: "Concrete" | "Steel Reinforcement" | "Composites & Advanced" | "Timber & Masonry";
  standardCode: string;
  characteristicStrength: string;
  modulusOfElasticity: number; // GPa
  poissonsRatio: number;
  density: number; // kg/m³
  embodiedCarbon: string; // kg CO2/kg
  thermalExpansion: string; // x10^-6 / °C
  ductilityClass: "High" | "Medium" | "Low" | "Brittle";
  description: string;
  primaryApplications: string[];
  stressStrainCurve: {
    type: "elastic-plastic" | "parabolic-linear" | "linear-brittle" | "hyperbolic";
    yieldStrain: number;
    ultimateStrain: number;
    peakStress: number; // MPa
  };
}

export const MATERIALS_DATA: EngineeringMaterial[] = [
  {
    id: "concrete-m25",
    name: "M25 Ordinary Structural Concrete",
    category: "Concrete",
    standardCode: "IS 456:2000 / BS 8500",
    characteristicStrength: "25 MPa (150mm Cube)",
    modulusOfElasticity: 25.0, // E = 5000 * sqrt(fck) = 25 GPa
    poissonsRatio: 0.20,
    density: 2400,
    embodiedCarbon: "0.12 kg CO₂/kg",
    thermalExpansion: "10.0 × 10⁻⁶ / °C",
    ductilityClass: "Brittle",
    description: "Standard reinforced concrete grade for residential slabs, footings, and low-rise building frames under mild environmental exposure.",
    primaryApplications: ["Residential foundations", "Raft slabs", "Retaining walls", "Pedestrian culverts"],
    stressStrainCurve: {
      type: "parabolic-linear",
      yieldStrain: 0.002,
      ultimateStrain: 0.0035,
      peakStress: 25.0,
    },
  },
  {
    id: "concrete-m40",
    name: "M40 Standard High-Durability Concrete",
    category: "Concrete",
    standardCode: "IS 456 / ACI 318",
    characteristicStrength: "40 MPa (150mm Cube)",
    modulusOfElasticity: 31.6,
    poissonsRatio: 0.18,
    density: 2450,
    embodiedCarbon: "0.16 kg CO₂/kg",
    thermalExpansion: "9.8 × 10⁻⁶ / °C",
    ductilityClass: "Brittle",
    description: "High-grade concrete designed for severe and very severe marine environments, heavily loaded columns, and prestressed elements.",
    primaryApplications: ["Coastal bridge piers", "Commercial high-rise columns", "Prestressed precast girders", "Water retaining tanks"],
    stressStrainCurve: {
      type: "parabolic-linear",
      yieldStrain: 0.0022,
      ultimateStrain: 0.0035,
      peakStress: 40.0,
    },
  },
  {
    id: "concrete-m80",
    name: "M80 High-Performance Silica Concrete",
    category: "Concrete",
    standardCode: "IS 456 Cl 6.1 / ACI 363R",
    characteristicStrength: "80 MPa (150mm Cube)",
    modulusOfElasticity: 44.7,
    poissonsRatio: 0.17,
    density: 2550,
    embodiedCarbon: "0.24 kg CO₂/kg",
    thermalExpansion: "9.2 × 10⁻⁶ / °C",
    ductilityClass: "Brittle",
    description: "High-performance concrete incorporating silica fume and low water-cement ratio (<0.28) using polycarboxylate superplasticizers.",
    primaryApplications: ["Burj Khalifa supertall core", "Mega-column axial loads", "Long-span cable-stayed bridge towers"],
    stressStrainCurve: {
      type: "parabolic-linear",
      yieldStrain: 0.0025,
      ultimateStrain: 0.0032,
      peakStress: 80.0,
    },
  },
  {
    id: "concrete-uhpc",
    name: "Ultra-High Performance Concrete (UHPC)",
    category: "Concrete",
    standardCode: "ASTM C1856 / NF P18-470",
    characteristicStrength: "150 - 200 MPa",
    modulusOfElasticity: 55.0,
    poissonsRatio: 0.21,
    density: 2600,
    embodiedCarbon: "0.38 kg CO₂/kg",
    thermalExpansion: "11.0 × 10⁻⁶ / °C",
    ductilityClass: "Medium",
    description: "Micro-reinforced cementitious composite with embedded micro-steel fibers achieving tensile strain-hardening and extreme impermeability.",
    primaryApplications: ["Precast bridge joint closures", "Blast-resistant defense barriers", "Ultra-slender architectural shells"],
    stressStrainCurve: {
      type: "parabolic-linear",
      yieldStrain: 0.0035,
      ultimateStrain: 0.006,
      peakStress: 180.0,
    },
  },
  {
    id: "concrete-bio",
    name: "Self-Healing Bio-Concrete (Bacterial)",
    category: "Concrete",
    standardCode: "RILEM TC 221-SHC",
    characteristicStrength: "35 MPa",
    modulusOfElasticity: 29.5,
    poissonsRatio: 0.19,
    density: 2380,
    embodiedCarbon: "0.08 kg CO₂/kg",
    thermalExpansion: "10.0 × 10⁻⁶ / °C",
    ductilityClass: "Brittle",
    description: "Contains dormant Bacillus pseudofirmus bacteria and calcium lactate nutrients that seal micro-cracks upon moisture ingress by precipitating limestone.",
    primaryApplications: ["Subterranean tunnel liners", "Underground parking basements", "Marine seawalls and breakwaters"],
    stressStrainCurve: {
      type: "parabolic-linear",
      yieldStrain: 0.002,
      ultimateStrain: 0.0035,
      peakStress: 35.0,
    },
  },
  {
    id: "steel-fe500d",
    name: "Fe500D High-Ductility TMT Rebar",
    category: "Steel Reinforcement",
    standardCode: "IS 1786:2008 / BS 4449 Grade 500B",
    characteristicStrength: "500 MPa Yield (565 MPa Tensile)",
    modulusOfElasticity: 200.0,
    poissonsRatio: 0.30,
    density: 7850,
    embodiedCarbon: "1.80 kg CO₂/kg",
    thermalExpansion: "12.0 × 10⁻⁶ / °C",
    ductilityClass: "High",
    description: "Thermo-Mechanically Treated (TMT) steel with tempered martensite outer rim and ductile ferrite-pearlite core engineered for seismic Zone IV/V ductility.",
    primaryApplications: ["Seismic moment frames", "Bridge piers", "Foundation cages", "Continuous beams"],
    stressStrainCurve: {
      type: "elastic-plastic",
      yieldStrain: 0.0025,
      ultimateStrain: 0.16, // 16% elongation
      peakStress: 565.0,
    },
  },
  {
    id: "steel-fe600",
    name: "Fe600 Super-Strength TMT Rebar",
    category: "Steel Reinforcement",
    standardCode: "IS 1786 / ASTM A615 Grade 80",
    characteristicStrength: "600 MPa Yield (660 MPa Tensile)",
    modulusOfElasticity: 200.0,
    poissonsRatio: 0.30,
    density: 7850,
    embodiedCarbon: "1.95 kg CO₂/kg",
    thermalExpansion: "12.0 × 10⁻⁶ / °C",
    ductilityClass: "Medium",
    description: "High-yield reinforcing steel designed to reduce rebar congestion in heavily reinforced mega-columns, deep raft foundations, and shear walls.",
    primaryApplications: ["High-rise column cages", "Deep mat foundation mats", "Long span transfer girders"],
    stressStrainCurve: {
      type: "elastic-plastic",
      yieldStrain: 0.003,
      ultimateStrain: 0.12,
      peakStress: 660.0,
    },
  },
  {
    id: "steel-strand-1860",
    name: "Low-Relaxation Prestressing Strand (1860 MPa)",
    category: "Steel Reinforcement",
    standardCode: "ASTM A416 / ISO 6934-4",
    characteristicStrength: "1,860 MPa Ultimate Tensile",
    modulusOfElasticity: 195.0,
    poissonsRatio: 0.30,
    density: 7850,
    embodiedCarbon: "2.30 kg CO₂/kg",
    thermalExpansion: "12.0 × 10⁻⁶ / °C",
    ductilityClass: "Medium",
    description: "7-wire high-tensile cold-drawn steel strand subjected to thermal stretching for low relaxation losses in post-tensioned and cable-stayed structures.",
    primaryApplications: ["Post-tensioned bridge decks", "Cable-stayed bridge stays", "Nuclear containment vessels", "Unbonded PT flat slabs"],
    stressStrainCurve: {
      type: "elastic-plastic",
      yieldStrain: 0.008,
      ultimateStrain: 0.045,
      peakStress: 1860.0,
    },
  },
  {
    id: "composite-cfrp",
    name: "CFRP (Carbon Fiber Reinforced Polymer)",
    category: "Composites & Advanced",
    standardCode: "ACI 440.2R / fib Bulletin 14",
    characteristicStrength: "2,800 - 3,500 MPa Tensile",
    modulusOfElasticity: 230.0,
    poissonsRatio: 0.28,
    density: 1600,
    embodiedCarbon: "22.0 kg CO₂/kg",
    thermalExpansion: "0.2 × 10⁻⁶ / °C",
    ductilityClass: "Brittle",
    description: "Ultra-high strength unidirectional carbon fiber matrix laminated with epoxy resin for seismic retrofitting, flexural strengthening, and shear wrapping.",
    primaryApplications: ["Seismic column jacket wrapping", "Bridge girder flexural strengthening", "Corrosion repair of marine structures"],
    stressStrainCurve: {
      type: "linear-brittle",
      yieldStrain: 0.015,
      ultimateStrain: 0.015,
      peakStress: 3100.0,
    },
  },
  {
    id: "timber-clt",
    name: "Cross-Laminated Timber (CLT)",
    category: "Timber & Masonry",
    standardCode: "ANSI/APA PRG 320 / Eurocode 5",
    characteristicStrength: "24 MPa Bending (Grade C24)",
    modulusOfElasticity: 11.0,
    poissonsRatio: 0.35,
    density: 480,
    embodiedCarbon: "-0.75 kg CO₂/kg (Carbon Negative)",
    thermalExpansion: "5.0 × 10⁻⁶ / °C",
    ductilityClass: "Medium",
    description: "Engineered solid wood panels made of cross-laminated timber boards providing bidirectional structural stiffness and long-term carbon sequestration.",
    primaryApplications: ["Mass timber residential towers", "Long-span roof diaphragms", "Shear walls for sustainable multi-story buildings"],
    stressStrainCurve: {
      type: "linear-brittle",
      yieldStrain: 0.003,
      ultimateStrain: 0.006,
      peakStress: 28.0,
    },
  },
];
