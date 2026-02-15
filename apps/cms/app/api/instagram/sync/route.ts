import { NextResponse } from "next/server";
import { instagramPosts } from "@/lib/db/schema";
import { getDb } from "@/lib/db/client";
import { fetchInstagramMedia } from "@/lib/instagram";

export async function POST() {
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Missing SUPABASE_DB_URL." }, { status: 500 });
  }

  try {
    const media = await fetchInstagramMedia();
    for (const item of media) {
      await db
        .insert(instagramPosts)
        .values({
          instagramId: item.instagramId,
          imageUrl: item.imageUrl,
          caption: item.caption,
          permalink: item.permalink,
          timestamp: item.timestamp,
        })
        .onConflictDoUpdate({
          target: instagramPosts.instagramId,
          set: {
            imageUrl: item.imageUrl,
            caption: item.caption,
            permalink: item.permalink,
            timestamp: item.timestamp,
          },
        });
    }

    return NextResponse.json({ imported: media.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
