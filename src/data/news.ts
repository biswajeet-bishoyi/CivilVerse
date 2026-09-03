export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: "Megaprojects" | "Green Concrete" | "BIM & Digital Twins" | "Geotechnical" | "Disaster Resilience";
  readTime: string;
  publishedDate: string;
  author: string;
  heroImage: string;
  summary: string;
  contentMarkdown: string;
  tags: string[];
}

export const NEWS_DATA: NewsArticle[] = [
  {
    id: "carbon-negative-concrete-breakthrough",
    slug: "carbon-negative-concrete-breakthrough",
    title: "Breakthrough in Carbon-Negative Concrete Using Biochar & Mineral Carbonation",
    category: "Green Concrete",
    readTime: "4 min read",
    publishedDate: "2026-08-28",
    author: "Dr. Elena Rostova, Structural Materials Lab",
    heroImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
    summary: "Researchers have demonstrated scalable C30/37 concrete mixes that permanently sequester more CO2 than emitted during clinker production by infusing activated biochar.",
    contentMarkdown: `
### The Decarbonization Challenge in Civil Engineering
Traditional Ordinary Portland Cement (OPC) production accounts for roughly **7-8% of global CO2 emissions**. For every ton of OPC manufactured, approximately 0.8 to 0.9 tons of carbon dioxide are released through limestone calcination ($CaCO_3 \\to CaO + CO_2$) and kiln combustion heat.

### How the Mineral Carbonation Process Works
1. **Biochar Inoculation:** High-surface-area pyrolyzed biochar is treated with calcium hydroxide solutions and incorporated at 2.5% to 5% by weight of binder.
2. **CO2 Curing Chambers:** During initial curing (first 24-48 hours), pressurized flue-gas CO2 is injected into curing chambers, converting free $Ca(OH)_2$ into dense calcium carbonate ($CaCO_3$) crystals inside the capillary pores.
3. **Microstructure Densification:** The carbonation reaction decreases capillary porosity by 18%, increasing 28-day compressive strength by 14% while achieving a net carbon-negative footprint of **-35 kg CO2 per cubic meter**.

### Industry Implications
Leading structural engineering firms and precast producers in Europe and North America have commenced pilot bridge girder and retaining wall deployments under updated EN 206 sustainability annexes.
    `,
    tags: ["Green Concrete", "Carbon Capture", "Sustainability", "Materials Science"],
  },
  {
    id: "high-speed-subsea-floating-tunnels",
    slug: "high-speed-subsea-floating-tunnels",
    title: "Submerged Floating Tunnels (Archimedes Bridges): Feasibility Across Deep Fjords",
    category: "Megaprojects",
    readTime: "5 min read",
    publishedDate: "2026-08-15",
    author: "Ing. Henrik Lindqvist, Coastal Infrastructure Group",
    heroImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80",
    summary: "Norway's E39 coastal highway project advances feasibility prototypes for buoyant tubular concrete tunnels suspended 30 meters beneath the water surface.",
    contentMarkdown: `
### Overcoming Extreme Fjord Depths
Across Norwegian fjords exceeding 1,200 meters in depth and 4 kilometers in width, traditional suspension bridge towers or seabed bored tunnels become economically or geotechnically unfeasible. The Submerged Floating Tunnel (SFT), or *Archimedes Bridge*, solves this by balancing buoyant displacement against tethered tension anchors.

### Structural Equilibrium & Dynamic Wave Forces
- **Net Positive Buoyancy:** The hollow twin-tube concrete cross section is engineered with a net upward buoyant force equal to 1.15 to 1.25 times its deadweight.
- **Tension Tethers & Pontoon Groups:** High-tensile spiral strand steel cables anchor the structure to seabed suction caissons, keeping the tunnel stable under extreme storm swell, tidal currents, and potential submarine impact loads.
- **Internal Safety Compartmentalization:** Double-hull post-tensioned shell design with water-tight bulkhead doors every 100 meters.
    `,
    tags: ["Tunnels", "Coastal Engineering", "Archimedes Bridge", "Hydrodynamics"],
  },
  {
    id: "digital-twins-seismic-monitoring",
    slug: "digital-twins-seismic-monitoring",
    title: "Real-Time Structural Health Monitoring with Fiber-Optic Sensors and AI Digital Twins",
    category: "BIM & Digital Twins",
    readTime: "4 min read",
    publishedDate: "2026-07-29",
    author: "Kenji Takahashi, Earthquake Engineering Institute",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    summary: "How embedded Fiber Bragg Grating (FBG) optical strain arrays feed continuous finite-element digital twins to detect micro-cracks before visual inspections can spot them.",
    contentMarkdown: `
### Moving Beyond Periodic Visual Inspections
Large bridges and supertall structures traditionally rely on biennial visual surveys. By embedding continuous Fiber Bragg Grating (FBG) optical strain sensors inside concrete bridge piers, steel truss joints, and foundation pile caps, engineers can stream real-time microstrain readings at 500 Hz.

### Neural Network Damage Localization
Cloud-connected digital twins compare real-time vibration signatures against calibrated finite-element baseline models. When stiffness degradation or localized crack propagation occurs, Archie AI algorithms pinpoint the exact joint coordinates with millimeter accuracy.
    `,
    tags: ["Digital Twins", "BIM", "Sensors", "Structural Health Monitoring"],
  },
];
