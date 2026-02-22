import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isAdmin(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  return session === process.env.ADMIN_SESSION_SECRET;
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });

  const validTypes = ["font/ttf", "font/otf", "font/woff", "font/woff2", "application/octet-stream", "application/x-font-ttf", "application/x-font-otf"];
  const ext = file.name.split(".").pop()?.toLowerCase();
  const validExts = ["ttf", "otf", "woff", "woff2"];
  if (!ext || !validExts.includes(ext)) {
    return NextResponse.json({ error: "Format non supporté. Utilise TTF, OTF, WOFF ou WOFF2." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from("project-fonts")
    .upload(fileName, arrayBuffer, { contentType: `font/${ext}`, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from("project-fonts").getPublicUrl(fileName);

  return NextResponse.json({ url: urlData.publicUrl, name: file.name.replace(`.${ext}`, "") });
}
