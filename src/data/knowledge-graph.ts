export interface GraphNode {
  id: string;
  name: string;
  category: "concept" | "structure" | "material" | "standard" | "calculator";
  description: string;
  linkUrl: string;
  importance: number; // 1 to 5
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const KNOWLEDGE_GRAPH_DATA: KnowledgeGraphData = {
  nodes: [
    // Concepts
    {
      id: "c-sfd-bmd",
      name: "Bending Moment & Shear",
      category: "concept",
      description: "Flexural mechanics governing beam stress distribution and rebar requirements.",
      linkUrl: "/learn/structural-mechanics-101",
      importance: 5,
    },
    {
      id: "c-terzaghi",
      name: "Terzaghi Bearing Capacity",
      category: "concept",
      description: "Geotechnical theory determining ultimate ground support under footings.",
      linkUrl: "/calculators?tab=bearing",
      importance: 4,
    },
    {
      id: "c-prestressing",
      name: "Prestressed Mechanics",
      category: "concept",
      description: "Internal compressive pre-loading of concrete to resist tension cracking.",
      linkUrl: "/learn",
      importance: 4,
    },
    {
      id: "c-buckling",
      name: "Euler Column Buckling",
      category: "concept",
      description: "Stability theory for slender structural compression members.",
      linkUrl: "/calculators?tab=column",
      importance: 4,
    },
    {
      id: "c-wc-ratio",
      name: "Water-Cement Ratio (Abrams)",
      category: "concept",
      description: "Fundamental law linking hydration voids to compressive strength.",
      linkUrl: "/calculators?tab=concrete",
      importance: 5,
    },

    // Materials
    {
      id: "m-hpc",
      name: "High-Performance Concrete (C80)",
      category: "material",
      description: "Ultra-dense concrete with silica fume and superplasticizers.",
      linkUrl: "/marvels/burj-khalifa",
      importance: 5,
    },
    {
      id: "m-high-tensile-steel",
      name: "High-Tensile Wire (1800 MPa)",
      category: "material",
      description: "Cold-drawn galvanized steel wires for long-span bridge cables.",
      linkUrl: "/marvels/akashi-kaikyo-bridge",
      importance: 4,
    },
    {
      id: "m-biochar-concrete",
      name: "Carbon-Negative Biochar Concrete",
      category: "material",
      description: "Sequestering CO2 during curing with carbon-infused aggregates.",
      linkUrl: "/news",
      importance: 3,
    },

    // Structures
    {
      id: "s-burj-khalifa",
      name: "Burj Khalifa",
      category: "structure",
      description: "World's tallest skyscraper with buttressed core structural system.",
      linkUrl: "/marvels/burj-khalifa",
      importance: 5,
    },
    {
      id: "s-millau-viaduct",
      name: "Millau Viaduct",
      category: "structure",
      description: "Multi-span cable-stayed bridge over Tarn Valley.",
      linkUrl: "/marvels/millau-viaduct",
      importance: 5,
    },
    {
      id: "s-hoover-dam",
      name: "Hoover Dam",
      category: "structure",
      description: "Mass concrete arch-gravity dam on the Colorado River.",
      linkUrl: "/marvels/hoover-dam",
      importance: 4,
    },
    {
      id: "s-channel-tunnel",
      name: "Channel Tunnel",
      category: "structure",
      description: "Undersea rail transit connecting Britain and France.",
      linkUrl: "/marvels/channel-tunnel",
      importance: 4,
    },
    {
      id: "s-akashi-bridge",
      name: "Akashi Kaikyō Bridge",
      category: "structure",
      description: "World's premier long-span earthquake-resilient suspension bridge.",
      linkUrl: "/marvels/akashi-kaikyo-bridge",
      importance: 4,
    },

    // Standards & Codes
    {
      id: "std-is456",
      name: "IS 456:2000 (Plain & RC)",
      category: "standard",
      description: "Indian Standard code of practice for reinforced concrete design.",
      linkUrl: "/learn",
      importance: 4,
    },
    {
      id: "std-aci318",
      name: "ACI 318-19 Building Code",
      category: "standard",
      description: "American Concrete Institute standard requirements for structural concrete.",
      linkUrl: "/learn",
      importance: 4,
    },
    {
      id: "std-eurocode2",
      name: "Eurocode 2 (EN 1992)",
      category: "standard",
      description: "Design of concrete structures in the European Union.",
      linkUrl: "/learn",
      importance: 4,
    },

    // Calculators
    {
      id: "calc-beam",
      name: "Beam Bending & Shear Calculator",
      category: "calculator",
      description: "Interactive SFD & BMD generator for point loads & UDL.",
      linkUrl: "/calculators?tab=beam",
      importance: 5,
    },
    {
      id: "calc-concrete",
      name: "Concrete Mix Proportioning Tool",
      category: "calculator",
      description: "Calculate cement, sand, water, and aggregate batch weights.",
      linkUrl: "/calculators?tab=concrete",
      importance: 4,
    },
    {
      id: "calc-rebar",
      name: "Steel Rebar & BBS Estimator",
      category: "calculator",
      description: "Bar weight per meter and cutting length estimation.",
      linkUrl: "/calculators?tab=rebar",
      importance: 4,
    },
    {
      id: "calc-bearing",
      name: "Terzaghi Bearing Capacity Calculator",
      category: "calculator",
      description: "Interactive footing ultimate and safe bearing capacity tool.",
      linkUrl: "/calculators?tab=bearing",
      importance: 4,
    },
  ],
  edges: [
    { source: "c-sfd-bmd", target: "calc-beam", relation: "calculated_by" },
    { source: "c-sfd-bmd", target: "std-is456", relation: "governed_by" },
    { source: "c-sfd-bmd", target: "std-aci318", relation: "governed_by" },
    { source: "c-sfd-bmd", target: "s-millau-viaduct", relation: "applied_in" },
    { source: "c-sfd-bmd", target: "s-burj-khalifa", relation: "applied_in" },

    { source: "c-wc-ratio", target: "m-hpc", relation: "formulates" },
    { source: "c-wc-ratio", target: "calc-concrete", relation: "calculated_by" },
    { source: "m-hpc", target: "s-burj-khalifa", relation: "used_in" },
    { source: "m-hpc", target: "s-hoover-dam", relation: "applied_in" },

    { source: "c-terzaghi", target: "calc-bearing", relation: "calculated_by" },
    { source: "c-terzaghi", target: "s-burj-khalifa", relation: "foundation_design" },
    { source: "c-terzaghi", target: "std-eurocode2", relation: "governed_by" },

    { source: "m-high-tensile-steel", target: "s-akashi-bridge", relation: "used_in" },
    { source: "m-high-tensile-steel", target: "c-prestressing", relation: "enables" },
    { source: "c-prestressing", target: "s-millau-viaduct", relation: "applied_in" },

    { source: "c-buckling", target: "s-burj-khalifa", relation: "stabilized_in" },
    { source: "m-biochar-concrete", target: "c-wc-ratio", relation: "optimizes" },
    { source: "calc-rebar", target: "std-is456", relation: "standardized_by" },
  ],
};
