import { MARVELS_DATA, StructureMarvel } from "@/data/marvels";
import { MATERIALS_DATA, EngineeringMaterial } from "@/data/materials";
import { CODE_COMPARISONS, CodeComparisonClause } from "@/data/codes";
import { FORMULAS_DATA } from "./formulas-repo";
import { FormulaRecord, PaginatedResult, QueryOptions } from "./types";

export class CivilDataEngine {
  private static instance: CivilDataEngine;

  private marvels: StructureMarvel[] = MARVELS_DATA;
  private formulas: FormulaRecord[] = FORMULAS_DATA;
  private materials: EngineeringMaterial[] = MATERIALS_DATA;
  private codes: CodeComparisonClause[] = CODE_COMPARISONS;

  private constructor() {}

  public static getInstance(): CivilDataEngine {
    if (!CivilDataEngine.instance) {
      CivilDataEngine.instance = new CivilDataEngine();
    }
    return CivilDataEngine.instance;
  }

  // 1. Marvels Query Engine with Pagination & Filtering
  public queryMarvels(options: QueryOptions = {}): PaginatedResult<StructureMarvel> {
    const { page = 1, limit = 6, search = "", category = "All", country = "All" } = options;

    let filtered = this.marvels;

    if (category && category !== "All") {
      filtered = filtered.filter((m) => m.category === category);
    }

    if (country && country !== "All") {
      filtered = filtered.filter((m) => m.country === country);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q) ||
          m.structuralSystem.toLowerCase().includes(q) ||
          m.summary.toLowerCase().includes(q) ||
          m.materialsUsed.some((mat) => mat.toLowerCase().includes(q))
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalCount,
      page: currentPage,
      limit,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }

  public getMarvelBySlug(slug: string): StructureMarvel | undefined {
    return this.marvels.find((m) => m.slug === slug || m.id === slug);
  }

  // 2. Formulas Query Engine with Pagination & Discipline Filtering
  public queryFormulas(options: QueryOptions = {}): PaginatedResult<FormulaRecord> {
    const { page = 1, limit = 10, search = "", discipline = "All" } = options;

    let filtered = this.formulas;

    if (discipline && discipline !== "All") {
      filtered = filtered.filter((f) => f.discipline === discipline);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.plainFormula.toLowerCase().includes(q) ||
          f.governingLaw.toLowerCase().includes(q) ||
          f.practicalApplication.toLowerCase().includes(q) ||
          f.parameters.some((p) => p.name.toLowerCase().includes(q) || p.symbol.toLowerCase().includes(q))
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalCount,
      page: currentPage,
      limit,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }

  public getFormulaById(id: string): FormulaRecord | undefined {
    return this.formulas.find((f) => f.id === id);
  }

  // 3. Materials Query Engine
  public queryMaterials(options: QueryOptions = {}): PaginatedResult<EngineeringMaterial> {
    const { page = 1, limit = 10, search = "", category = "All" } = options;

    let filtered = this.materials;

    if (category && category !== "All") {
      filtered = filtered.filter((m) => m.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.standardCode.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.primaryApplications.some((a) => a.toLowerCase().includes(q))
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalCount,
      page: currentPage,
      limit,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }

  // 4. Codes Query Engine
  public queryCodes(options: QueryOptions = {}): PaginatedResult<CodeComparisonClause> {
    const { page = 1, limit = 10, search = "", category = "All" } = options;

    let filtered = this.codes;

    if (category && category !== "All") {
      filtered = filtered.filter((c) => c.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.topic.toLowerCase().includes(q) ||
          c.is456.rule.toLowerCase().includes(q) ||
          c.aci318.rule.toLowerCase().includes(q) ||
          c.eurocode2.rule.toLowerCase().includes(q) ||
          c.engineeringInsight.toLowerCase().includes(q)
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      totalCount,
      page: currentPage,
      limit,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }

  // 5. Global Cross-Database Instant Search
  public globalSearch(query: string) {
    if (!query.trim()) return { marvels: [], formulas: [], materials: [], codes: [] };
    return {
      marvels: this.queryMarvels({ search: query, limit: 5 }).data,
      formulas: this.queryFormulas({ search: query, limit: 5 }).data,
      materials: this.queryMaterials({ search: query, limit: 5 }).data,
      codes: this.queryCodes({ search: query, limit: 5 }).data,
    };
  }
}

export const dataEngine = CivilDataEngine.getInstance();
export * from "./types";
export * from "./formulas-repo";
