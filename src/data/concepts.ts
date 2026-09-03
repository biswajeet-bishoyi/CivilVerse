export interface Concept {
  id: string;
  slug: string;
  title: string;
  category: "Structural Analysis" | "Geotechnical" | "Concrete & Materials" | "Fluid Mechanics" | "Transportation & Surveying";
  difficulty: "Fundamental" | "Intermediate" | "Advanced";
  formula?: string;
  formulaDescription?: string;
  summary: string;
  fullExplanation: string;
  practicalApplication: string;
  failureMechanism: string;
  governingCodes: string[];
  relatedCalculators: string[];
  relatedStructures: string[];
}

export const CONCEPTS_DATA: Concept[] = [
  {
    id: "shear-force-bending-moment",
    slug: "shear-force-bending-moment",
    title: "Shear Force & Bending Moment in Beams",
    category: "Structural Analysis",
    difficulty: "Fundamental",
    formula: "V = dM/dx, \\quad M(x) = \\int V(x) dx",
    formulaDescription: "The shear force V is the first spatial derivative of the bending moment M along the beam span.",
    summary: "Internal forces induced in a flexural structural member subjected to transverse loads, crucial for dimensioning cross-sections and rebar placement.",
    fullExplanation: "When a beam is subjected to transverse loads, internal internal shear forces resist sliding along vertical planes, while bending moments induce compressive stresses on one side and tensile stresses on the opposite side of the neutral axis. The maximum bending moment occurs precisely where the shear force passes through zero.",
    practicalApplication: "Determining where to place tensile reinforcement in reinforced concrete beams and sizing steel I-beam flanges to resist peak flexural stresses.",
    failureMechanism: "Flexural tensile cracking, shear diagonal tension failure (typically at 45 degrees near supports), or lateral torsional buckling in unbraced steel members.",
    governingCodes: ["IS 456:2000 (Cl 38)", "ACI 318-19 (Ch 22)", "Eurocode 2 (EN 1992-1-1)"],
    relatedCalculators: ["beam-calculator"],
    relatedStructures: ["millau-viaduct", "burj-khalifa"],
  },
  {
    id: "terzaghi-bearing-capacity",
    slug: "terzaghi-bearing-capacity",
    title: "Terzaghi's Ultimate Soil Bearing Capacity",
    category: "Geotechnical",
    difficulty: "Intermediate",
    formula: "q_{ult} = c N_c + q N_q + 0.5 \\gamma B N_\\gamma",
    formulaDescription: "Total ultimate bearing capacity combining soil cohesion (c), surcharge depth (q = γD), and footing width (B) with Terzaghi bearing capacity factors (Nc, Nq, Nγ).",
    summary: "The foundational formulation in geotechnical engineering for calculating the maximum pressure a shallow footing can apply before ground shear failure.",
    fullExplanation: "Karl Terzaghi's classical 1943 theory evaluates the equilibrium of a triangular elastic soil wedge beneath a continuous shallow footing transitioning into radial shear zones and passive Rankine zones. Factors Nc, Nq, and Nγ depend solely on the internal angle of friction (ϕ).",
    practicalApplication: "Sizing isolated pad footings, strip footings, and mat foundations to avoid catastrophic building settlement or bearing failure.",
    failureMechanism: "General shear failure (rapid tilting/heaving in dense sand or stiff clay), local shear failure, or punching shear in loose compressible soils.",
    governingCodes: ["IS 6403:1981", "Eurocode 7 (EN 1997-1)", "AASHTO LRFD Bridge Design"],
    relatedCalculators: ["bearing-capacity-calculator"],
    relatedStructures: ["burj-khalifa", "hoover-dam"],
  },
  {
    id: "concrete-water-cement-ratio",
    slug: "concrete-water-cement-ratio",
    title: "Abrams' Law & Water-Cement Ratio",
    category: "Concrete & Materials",
    difficulty: "Fundamental",
    formula: "f_c = \\frac{A}{B^{w/c}}",
    formulaDescription: "Compressive strength (fc) is inversely exponential to the water-cement mass ratio (w/c), where A and B are empirical material constants.",
    summary: "The single most fundamental principle of concrete technology: higher water content increases workability but drastically reduces compressive strength and durability.",
    fullExplanation: "Excess water beyond the ~0.25 to 0.28 stoichiometric requirement needed for hydration of Portland cement leaves capillary voids upon evaporation. These interconnected capillary pores act as stress concentrators and paths for chloride/sulfate ingress, degrading compressive strength and accelerating steel rebar corrosion.",
    practicalApplication: "Designing durable mix proportions for RCC columns, slabs, marine structures, and mass foundations using superplasticizers to achieve workability without excess water.",
    failureMechanism: "Excessive drying shrinkage cracking, increased porosity, carbonation-induced corrosion, and freeze-thaw spalling.",
    governingCodes: ["IS 10262:2019", "ACI 211.1", "EN 206"],
    relatedCalculators: ["concrete-mix-calculator"],
    relatedStructures: ["hoover-dam", "three-gorges-dam"],
  },
  {
    id: "euler-column-buckling",
    slug: "euler-column-buckling",
    title: "Euler's Critical Buckling Load for Columns",
    category: "Structural Analysis",
    difficulty: "Intermediate",
    formula: "P_{cr} = \\frac{\\pi^2 E I}{(K L)^2}",
    formulaDescription: "Critical axial load (Pcr) based on elastic modulus (E), second moment of area (I), unsupported length (L), and effective length factor (K).",
    summary: "Predicts the sudden sideways instability failure of slender compression members well before material crushing occurs.",
    fullExplanation: "For slender columns, compressive failure occurs not from yielding or crushing, but through elastic instability. The effective length factor K accounts for boundary restraint: K=1.0 for pin-pin, K=0.5 for fixed-fixed, K=0.7 for fixed-pin, and K=2.0 for cantilever.",
    practicalApplication: "Designing bridge truss members, steel building columns, tower crane masts, and bracing struts.",
    failureMechanism: "Sudden catastrophic lateral deflection and moment amplification under axial compression without prior plastic yielding.",
    governingCodes: ["AISC 360-16", "IS 800:2007 (Cl 7)", "Eurocode 3 (EN 1993-1-1)"],
    relatedCalculators: ["column-capacity-calculator"],
    relatedStructures: ["burj-khalifa", "akashi-kaikyo-bridge"],
  },
  {
    id: "bernoulli-energy-equation",
    slug: "bernoulli-energy-equation",
    title: "Bernoulli's Principle & Total Hydraulic Head",
    category: "Fluid Mechanics",
    difficulty: "Fundamental",
    formula: "H = z + \\frac{P}{\\gamma} + \\frac{v^2}{2g} = \\text{constant}",
    formulaDescription: "Total head H equals the sum of elevation head (z), pressure head (P/γ), and velocity head (v²/2g) along a streamline in steady, inviscid flow.",
    summary: "Conservation of mechanical energy in fluid flow, governing pipe networks, open channels, spillways, and dam hydraulic structures.",
    fullExplanation: "Bernoulli's theorem states that along a streamline of frictionless, incompressible flow, an increase in fluid velocity occurs simultaneously with a decrease in static pressure or potential energy. When applied to real-world civil hydraulics, head loss terms (friction and minor losses) are added.",
    practicalApplication: "Design of municipal water supply networks, dam spillway chutes, penstocks for hydroelectric turbines, and culvert flow capacity.",
    failureMechanism: "Cavitation pitting on spillway surfaces, hydraulic jump erosion, water hammer pipe rupture.",
    governingCodes: ["USBR Design of Small Dams", "IS 6934", "HEC-RAS Hydraulic Reference"],
    relatedCalculators: ["unit-converter"],
    relatedStructures: ["hoover-dam", "three-gorges-dam"],
  },
  {
    id: "prestressed-concrete-prestressing",
    slug: "prestressed-concrete-prestressing",
    title: "Prestressed Concrete Mechanics",
    category: "Concrete & Materials",
    difficulty: "Advanced",
    formula: "\\sigma = -\\frac{P}{A} \\pm \\frac{P e y}{I} \\pm \\frac{M y}{I}",
    formulaDescription: "Combined normal stress distribution combining direct prestress compression (P/A), eccentricity moment (P·e·y/I), and external load moment (M·y/I).",
    summary: "Introducing intentional internal compressive stresses into high-strength concrete using tensioned steel tendons to counteract service load tensile stresses.",
    fullExplanation: "Because plain concrete possesses only 10% of its compressive strength in tension, pre-tensioning or post-tensioning high-strength steel strands pre-compresses the bottom fiber. Under live loads, the tensile stress must first overcome the pre-compression before cracking can occur, allowing longer spans with thinner decks.",
    practicalApplication: "Long-span highway flyovers, post-tensioned floor slabs in high-rises, nuclear containment vessels, and railway sleeper ties.",
    failureMechanism: "Prestress loss over time (steel relaxation, concrete creep, shrinkage, elastic shortening) or anchorage zone splitting failure.",
    governingCodes: ["IS 1343:2012", "ACI 318-19 (Ch 24)", "Eurocode 2 Part 1-1"],
    relatedCalculators: ["beam-calculator"],
    relatedStructures: ["millau-viaduct"],
  },
];
