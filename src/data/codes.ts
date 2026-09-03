export interface CodeComparisonClause {
  id: string;
  topic: string;
  category: "Safety Factors" | "Flexure & Compression" | "Shear & Torsion" | "Serviceability & Deflection" | "Durability & Cover";
  is456: {
    clause: string;
    rule: string;
    equation?: string;
  };
  aci318: {
    clause: string;
    rule: string;
    equation?: string;
  };
  eurocode2: {
    clause: string;
    rule: string;
    equation?: string;
  };
  engineeringInsight: string;
}

export const CODE_COMPARISONS: CodeComparisonClause[] = [
  {
    id: "partial-safety-factors",
    topic: "Material Partial Safety Factors (γ_m / φ)",
    category: "Safety Factors",
    is456: {
      clause: "Cl 36.4.2.1",
      rule: "Concrete: γ_c = 1.50 | Steel: γ_s = 1.15",
      equation: "f_{cd} = 0.67 f_{ck} / 1.50 = 0.446 f_{ck}",
    },
    aci318: {
      clause: "Table 21.2.1",
      rule: "Strength reduction factor φ: Flexure (Tension-controlled) = 0.90 | Compression (Tied) = 0.65 | Shear = 0.75",
      equation: "φ M_n \\ge M_u",
    },
    eurocode2: {
      clause: "Cl 2.4.2.4 Table 2.1N",
      rule: "Persistent & Transient: Concrete γ_c = 1.50 | Steel γ_s = 1.15. Accidental: γ_c = 1.20 | γ_s = 1.00",
      equation: "f_{cd} = \\alpha_{cc} f_{ck} / \\gamma_c \\quad (\\alpha_{cc} = 0.85-1.0)",
    },
    engineeringInsight: "IS 456 and Eurocode 2 divide nominal material strengths by partial safety factors (γ_m), while ACI 318 applies a holistic capacity reduction factor (φ) to nominal section resistance.",
  },
  {
    id: "max-compressive-strain",
    topic: "Maximum Concrete Compressive Strain (ε_cu)",
    category: "Flexure & Compression",
    is456: {
      clause: "Cl 38.1(b)",
      rule: "Maximum strain at outer extreme fiber in bending = 0.0035. Under pure axial compression = 0.0020.",
      equation: "\\epsilon_{cu} = 0.0035",
    },
    aci318: {
      clause: "Cl 22.2.2.1",
      rule: "Maximum usable strain at extreme concrete compression fiber is strictly fixed at 0.0030.",
      equation: "\\epsilon_u = 0.0030",
    },
    eurocode2: {
      clause: "Table 3.1",
      rule: "For fck ≤ 50 MPa: ε_cu2 = 0.0035 (parabolic-rectangular) and ε_cu3 = 0.0035 (bilinear). Decreases for high-strength concrete.",
      equation: "\\epsilon_{cu2} = 0.0035",
    },
    engineeringInsight: "ACI 318 adopts a slightly more conservative strain limit (0.0030) compared to IS 456 and Eurocode 2 (0.0035), leading to marginally shallower neutral axis depth limits.",
  },
  {
    id: "modulus-of-elasticity",
    topic: "Short-Term Modulus of Elasticity of Concrete (E_c)",
    category: "Serviceability & Deflection",
    is456: {
      clause: "Cl 6.2.3.1",
      rule: "Calculated based on characteristic cube strength f_ck (allowable ±20% variation).",
      equation: "E_c = 5000 \\sqrt{f_{ck}} \\quad (\\text{in MPa})",
    },
    aci318: {
      clause: "Cl 19.2.2.1",
      rule: "For normal-weight concrete with density w_c between 1440 and 2560 kg/m³.",
      equation: "E_c = 4700 \\sqrt{f'_c} \\quad (\\text{in MPa})",
    },
    eurocode2: {
      clause: "Table 3.1 & Cl 3.1.3",
      rule: "Secant modulus between σ_c = 0 and 0.4 f_cm.",
      equation: "E_{cm} = 22 \\left(\\frac{f_{cm}}{10}\\right)^{0.3} \\quad (\\text{in GPa})",
    },
    engineeringInsight: "IS 456 uses cube strength ($f_{ck}$), whereas ACI 318 uses cylinder strength ($f'_c \\approx 0.8 f_{ck}$). For an M25 grade concrete, IS 456 yields $E_c = 25,000\\text{ MPa}$ while ACI 318 gives $21,000\\text{ MPa}$.",
  },
  {
    id: "span-to-depth-ratios",
    topic: "Basic Span-to-Effective Depth Ratio (L/d)",
    category: "Serviceability & Deflection",
    is456: {
      clause: "Cl 23.2.1",
      rule: "Spans ≤ 10m: Cantilever = 7 | Simply Supported = 20 | Continuous = 26 (multiplied by tension steel modification factor F_t).",
      equation: "(L/d)_{basic} = 7, \\, 20, \\, 26",
    },
    aci318: {
      clause: "Table 9.3.1.1",
      rule: "Minimum overall thickness h for solid one-way slabs: Cantilever = L/10 | Simply Supported = L/20 | One end continuous = L/24 | Both continuous = L/28.",
      equation: "h_{min} = L/20 \\text{ to } L/10",
    },
    eurocode2: {
      clause: "Cl 7.4.2 Eq 7.16",
      rule: "Function of reinforcement ratio ρ and reference ratio ρ_0. Typical values: Simply supported = 14 to 20 | Continuous = 20 to 30.",
      equation: "l/d = K \\left[ 11 + 1.5 \\sqrt{f_{ck}} \\frac{\\rho_0}{\\rho} \\right]",
    },
    engineeringInsight: "Eurocode 2 provides a continuous mathematical formula depending on exact tensile rebar ratio $\\rho$, whereas IS 456 applies empirical curve multipliers.",
  },
  {
    id: "concrete-cover-durability",
    topic: "Minimum Nominal Cover for Severe Marine Exposure",
    category: "Durability & Cover",
    is456: {
      clause: "Table 16",
      rule: "Severe (Immersion in seawater) = 45 mm | Very Severe (Sea water spray) = 50 mm | Extreme (Tidal zone) = 75 mm.",
      equation: "c_{nom} = 45 - 75\\text{ mm}",
    },
    aci318: {
      clause: "Table 20.5.1.3.1",
      rule: "Concrete exposed to weather or in contact with ground: No. 6 through No. 18 rebar = 50 mm (2 in). Cast against ground = 75 mm (3 in).",
      equation: "c_{min} = 50 - 75\\text{ mm}",
    },
    eurocode2: {
      clause: "Cl 4.4.1.2 Table 4.4N",
      rule: "Class XS3 (Tidal, splash and spray zones): c_min,dur = 45 mm + Δc_dev (10 mm allowance) = 55 mm nominal.",
      equation: "c_{nom} = c_{min} + \\Delta c_{dev}",
    },
    engineeringInsight: "All major codes converge on 45 to 75 mm cover for coastal and tidal structures to inhibit chloride ion penetration to rebar surfaces.",
  },
];
