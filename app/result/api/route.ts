import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const supabase = createClient(
    "https://ebneycbqwtuhyxggghia.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibmV5Y2Jxd3R1aHl4Z2dnaGlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTE0MDY2OCwiZXhwIjoyMDA0NzE2NjY4fQ.s6hubrc6xEmKnz2Z7f-QxgOq9sJNN19d8fqtosCoPDs"
  );

  const searchParams = request.nextUrl.searchParams;
  const school_type = searchParams.get("query");

  const { data, error } = await supabase.rpc("get_top10_school_ranking_group", {
    type: school_type,
  });

  return NextResponse.json(data, {
    status: 200,
  });
}
