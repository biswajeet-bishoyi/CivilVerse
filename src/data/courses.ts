export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  archieTip: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  durationMinutes: number;
  summary: string;
  contentMarkdown: string;
  keyFormulas?: { name: string; formula: string; note: string }[];
  quiz: QuizQuestion[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  category: "Structural" | "Geotechnical" | "Materials" | "Hydraulics" | "Project Management";
  iconName: string;
  description: string;
  lessons: Lesson[];
}

export const COURSES_DATA: Course[] = [
  {
    id: "structural-mechanics-101",
    slug: "structural-mechanics-101",
    title: "Structural Mechanics & Beam Analysis",
    level: "Beginner",
    estimatedHours: 4,
    category: "Structural",
    iconName: "Compass",
    description: "Master shear force diagrams, bending moments, deflection theorems, and stress equilibrium in flexural members.",
    lessons: [
      {
        id: "lesson-1",
        slug: "sfd-bmd-fundamentals",
        title: "Shear Force (SFD) and Bending Moment (BMD) Diagrams",
        durationMinutes: 25,
        summary: "Understand the sign conventions, differential relations, and point-by-point drawing of shear and moment profiles.",
        contentMarkdown: `
### Fundamental Relations
In any beam subjected to distributed load $w(x)$, the differential equations of equilibrium state:
1. **Slope of Shear Force Diagram equals distributed load:**
   $$\\frac{dV}{dx} = -w(x)$$
2. **Slope of Bending Moment Diagram equals shear force:**
   $$\\frac{dM}{dx} = V(x)$$

### Key Rules to Remember
- **Point Loads:** Cause an instantaneous vertical jump in the SFD equal to the load magnitude. The BMD has a sharp change in slope (cusp).
- **Uniformly Distributed Loads (UDL):** Produce a linear sloped line on the SFD and a parabolic curve ($2^{\\text{nd}}$ degree polynomial) on the BMD.
- **Maximum Bending Moment:** Occurs where the shear force passes through zero ($V = 0$).
- **Points of Contraflexure:** Points along the span where the bending moment changes sign ($M = 0$). This is where curvature reverses from sagging to hogging.
        `,
        keyFormulas: [
          {
            name: "Max Moment (Simply Supported + Central Point Load W)",
            formula: "M_{max} = \\frac{W \\cdot L}{4}",
            note: "Occurs at midspan L/2",
          },
          {
            name: "Max Moment (Simply Supported + Full UDL w)",
            formula: "M_{max} = \\frac{w \\cdot L^2}{8}",
            note: "Occurs at midspan L/2 where V=0",
          },
          {
            name: "Max Moment (Cantilever + End Point Load W)",
            formula: "M_{max} = W \\cdot L",
            note: "Occurs at fixed support (hogging)",
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "Where does the maximum bending moment occur in a simply supported beam with a uniformly distributed load (UDL)?",
            options: [
              "At the left support",
              "At the point where shear force is maximum",
              "At midspan where shear force is zero",
              "At the points of contraflexure",
            ],
            correctIndex: 2,
            explanation: "Since dM/dx = V, the derivative of moment is zero where shear force is zero, representing the mathematical peak (maximum moment).",
            archieTip: "Remember Archie's rule: Whenever you see shear cross the zero line, look directly down to find your peak bending moment!",
          },
          {
            id: "q2",
            question: "What is the shape of the Bending Moment Diagram for a simply supported beam under a full Uniformly Distributed Load (UDL)?",
            options: [
              "Horizontal straight line",
              "Triangular shape",
              "Second-degree parabolic curve",
              "Cubic spline curve",
            ],
            correctIndex: 2,
            explanation: "Integrating a linear shear force equation V(x) = wL/2 - wx results in a 2nd degree parabolic polynomial M(x) = (wx/2)(L - x).",
            archieTip: "Each level of load integration increases the polynomial order: Load (w=const) -> Shear (degree 1) -> Moment (degree 2) -> Slope (degree 3) -> Deflection (degree 4).",
          },
        ],
      },
      {
        id: "lesson-2",
        slug: "flexure-formula-and-section-modulus",
        title: "Bending Stresses & Section Modulus (Z)",
        durationMinutes: 30,
        summary: "Apply Euler-Bernoulli beam theory $\\sigma = M y / I$ to compute elastic flexural stresses and section capacities.",
        contentMarkdown: `
### Euler-Bernoulli Bending Formula
For pure bending within the elastic limit:
$$\\frac{\\sigma}{y} = \\frac{M}{I} = \\frac{E}{R}$$

Where:
- $\\sigma$ = Bending stress at distance $y$ from the neutral axis
- $y$ = Distance from the neutral axis
- $M$ = Applied bending moment at the section
- $I$ = Second moment of area (Moment of Inertia) about the neutral axis
- $E$ = Young's modulus of elasticity
- $R$ = Radius of curvature of the bent beam

### Section Modulus ($Z$)
The Section Modulus combines geometric properties to determine moment capacity:
$$Z = \\frac{I}{y_{max}}$$
$$\\sigma_{max} = \\frac{M}{Z} \\implies M_{allowable} = \\sigma_{allowable} \\cdot Z$$

For a rectangular beam of width $b$ and depth $d$:
$$I = \\frac{b d^3}{12}, \\quad y_{max} = \\frac{d}{2} \\implies Z = \\frac{b d^2}{6}$$
        `,
        keyFormulas: [
          {
            name: "Elastic Bending Equation",
            formula: "\\sigma_{max} = \\frac{M}{Z}",
            note: "Peak tension at bottom fiber, peak compression at top for sagging",
          },
          {
            name: "Rectangular Section Modulus",
            formula: "Z = \\frac{b d^2}{6}",
            note: "Depth d has quadratic influence on section capacity",
          },
        ],
        quiz: [
          {
            id: "q3",
            question: "If you double the depth (d) of a rectangular beam while keeping the width (b) constant, how does its Section Modulus (Z) change?",
            options: [
              "It doubles (2x)",
              "It increases 4 times (4x)",
              "It increases 8 times (8x)",
              "It remains unchanged",
            ],
            correctIndex: 1,
            explanation: "Since Z = b·d²/6, doubling d results in (2d)² = 4d², increasing the section modulus and flexural moment capacity fourfold.",
            archieTip: "In structural design, increasing depth is always the most economical way to boost flexural strength!",
          },
        ],
      },
    ],
  },
  {
    id: "concrete-technology-mix-design",
    slug: "concrete-technology-mix-design",
    title: "Concrete Mix Design & Quality Control",
    level: "Intermediate",
    estimatedHours: 3.5,
    category: "Materials",
    iconName: "Layers",
    description: "Learn IS 10262 & ACI 211 standards for proportioning cement, sand, coarse aggregate, water-cement ratios, and admixtures.",
    lessons: [
      {
        id: "lesson-c1",
        slug: "water-cement-ratio-and-durability",
        title: "Water-Cement Ratio, Hydration, and Target Mean Strength",
        durationMinutes: 20,
        summary: "Calculate characteristic strength $f_{ck}$, standard deviation, target mean strength $f'_{ck}$, and minimum cement content.",
        contentMarkdown: `
### Target Mean Strength Formula (IS 10262)
$$f'_{ck} = f_{ck} + 1.65 \\cdot s$$

Where:
- $f_{ck}$ = Characteristic compressive strength at 28 days (e.g., 25 MPa for M25)
- $s$ = Standard deviation (typically 4.0 MPa for M20-M25, 5.0 MPa for M30-M50)
- $1.65$ = Statistical factor ensuring that not more than 5% of test results fall below $f_{ck}$

### Workability & Slump Requirements
- **Mass concrete / Shallow footings:** 25-75 mm slump
- **Heavily reinforced slabs / beams / columns:** 75-125 mm slump
- **Pumped concrete / Tremie piles:** 125-175 mm slump with superplasticizer
        `,
        keyFormulas: [
          {
            name: "Target Mean Strength",
            formula: "f'_{ck} = f_{ck} + 1.65 s",
            note: "Standard 28-day cylinder or cube design target",
          },
        ],
        quiz: [
          {
            id: "qc1",
            question: "For an M25 grade concrete with a standard deviation s = 4.0 N/mm², what is the required Target Mean Strength f'ck?",
            options: ["25.0 N/mm²", "29.0 N/mm²", "31.6 N/mm²", "35.2 N/mm²"],
            correctIndex: 2,
            explanation: "f'ck = fck + 1.65 · s = 25 + (1.65 × 4.0) = 25 + 6.6 = 31.6 N/mm².",
            archieTip: "Never design concrete directly for fck! Target mean strength accounts for site quality variation so 95% of pours pass.",
          },
        ],
      },
    ],
  },
  {
    id: "geotechnical-foundations",
    slug: "geotechnical-foundations",
    title: "Geotechnical Engineering & Foundation Design",
    level: "Intermediate",
    estimatedHours: 4,
    category: "Geotechnical",
    iconName: "Activity",
    description: "Understand soil mechanics, Terzaghi bearing capacity, settlement analysis, and deep pile foundation design.",
    lessons: [
      {
        id: "lesson-g1",
        slug: "terzaghi-bearing-capacity-calculations",
        title: "Terzaghi Bearing Capacity & Factor of Safety",
        durationMinutes: 30,
        summary: "Derive safe bearing capacity ($q_{safe}$) using cohesion, surcharge, width factors, and a safety factor of 2.5 to 3.0.",
        contentMarkdown: `
### Safe Bearing Capacity ($q_{safe}$)
$$q_{safe} = \\frac{q_{ult} - \\gamma D_f}{FOS} + \\gamma D_f$$

Where:
- $q_{ult}$ = Ultimate bearing capacity from Terzaghi's equation
- $\\gamma D_f$ = Surcharge pressure from soil above foundation level
- $FOS$ = Factor of Safety (typically 2.5 to 3.0 for building foundations)
        `,
        keyFormulas: [
          {
            name: "Terzaghi Strip Footing",
            formula: "q_{ult} = c N_c + \\gamma D_f N_q + 0.5 \\gamma B N_\\gamma",
            note: "Nc, Nq, Nγ are dimensionless functions of friction angle ϕ",
          },
        ],
        quiz: [
          {
            id: "qg1",
            question: "For purely cohesive saturated clay (ϕ = 0), what are the Terzaghi bearing capacity factors (Nc, Nq, Nγ)?",
            options: [
              "Nc = 5.7, Nq = 1.0, Nγ = 0",
              "Nc = 1.0, Nq = 0, Nγ = 1.0",
              "Nc = 9.0, Nq = 3.0, Nγ = 1.2",
              "Nc = 0, Nq = 5.7, Nγ = 0",
            ],
            correctIndex: 0,
            explanation: "For ϕ = 0°, Terzaghi's factors are Nc = 5.7, Nq = 1.0, and Nγ = 0, meaning footing width (B) has no direct effect on ultimate bearing capacity in pure clay.",
            archieTip: "In undrained clay, soil cohesion (undrained shear strength Cu) dominates bearing capacity rather than foundation width!",
          },
        ],
      },
    ],
  },
];
