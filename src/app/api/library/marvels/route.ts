import { NextRequest, NextResponse } from "next/server";
import { dataEngine } from "@/lib/data-engine";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const result = dataEngine.queryMarvels({ page, limit, search, category });
  return NextResponse.json(result);
}
