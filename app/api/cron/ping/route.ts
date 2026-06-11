import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/env";

// Called daily by Vercel Cron to keep Supabase from pausing (free tier pauses after 1 week of inactivity)
export async function GET(request: Request) {
  // Verify cron secret to prevent abuse
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from("projects").select("id").limit(1);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, pinged_at: new Date().toISOString() });
}
