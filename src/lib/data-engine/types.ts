import { StructureMarvel } from "@/data/marvels";
import { EngineeringMaterial } from "@/data/materials";
import { CodeComparisonClause } from "@/data/codes";

export type EngineeringDiscipline =
  | "Structural Mechanics"
  | "Geotechnical Engineering"
  | "Hydraulics & Fluid Mechanics"
  | "Concrete Technology & RCC"
  | "Transportation & Highway"
  | "Environmental & Water Resources";

export interface FormulaParameter {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

export interface FormulaRecord {
  id: string;
  name: string;
  discipline: EngineeringDiscipline;
  latexEquation: string;
  plainFormula: string;
  governingLaw: string;
  standardCodeReference?: string;
  parameters: FormulaParameter[];
  assumptions: string[];
  practicalApplication: string;
  interactiveDemo?: {
    inputs: {
      name: string;
      symbol: string;
      defaultValue: number;
      min: number;
      max: number;
      step: number;
      unit: string;
    }[];
    compute: (inputs: Record<string, number>) => {
      outputValue: number;
      outputUnit: string;
      outputLabel: string;
    };
  };
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  discipline?: EngineeringDiscipline | "All";
  country?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
