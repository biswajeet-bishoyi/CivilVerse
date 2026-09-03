import { NextRequest, NextResponse } from "next/server";
import { dataEngine, EngineeringDiscipline } from "@/lib/data-engine";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const discipline = (searchParams.get("discipline") || "All") as EngineeringDiscipline | "All";

  const result = dataEngine.queryFormulas({ page, limit, search, discipline });
  return NextResponse.json(result);
}
