import { NextResponse } from "next/server";
import { getSupabase, getSupabaseConfigError, objToSnake } from "@/lib/db/supabase-data";
import { fetchInstagramMedia } from "@/lib/instagram";

export async function POST() {
  if (getSupabaseConfigError()) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY." },
      { status: 500 },
    );
  }

  const sb = await getSupabase();
  if (!sb) {
    return NextResponse.json({ error: "Supabase not configured." }, { status: 500 });
  }

  try {
    const media = await fetchInstagramMedia();
    for (const item of media) {
      const timestamp =
        typeof item.timestamp === "string"
          ? item.timestamp
          : item.timestamp instanceof Date
            ? item.timestamp.toISOString()
            : new Date().toISOString();
      const { error } = await sb.from("instagram_posts").upsert(
        objToSnake({
          instagramId: item.instagramId,
          imageUrl: item.imageUrl,
          caption: item.caption,
          permalink: item.permalink,
          timestamp,
        }) as Record<string, unknown>,
        { onConflict: "instagram_id" },
      );
      if (error) throw error;
    }

    return NextResponse.json({ imported: media.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
