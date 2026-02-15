type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export type NormalizedInstagramPost = {
  instagramId: string;
  imageUrl: string;
  caption: string | null;
  permalink: string;
  timestamp: Date;
};

export async function fetchInstagramMedia(): Promise<NormalizedInstagramPost[]> {
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accountId || !accessToken) {
    throw new Error("Missing Instagram env vars.");
  }

  const url = new URL(`https://graph.facebook.com/v22.0/${accountId}/media`);
  url.searchParams.set(
    "fields",
    "id,caption,media_url,thumbnail_url,permalink,timestamp",
  );
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Instagram API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: InstagramMediaItem[] };
  const items = payload.data ?? [];

  return items
    .filter((item) => (item.media_url || item.thumbnail_url) && item.permalink && item.timestamp)
    .map((item) => ({
      instagramId: item.id,
      imageUrl: item.media_url ?? item.thumbnail_url ?? "",
      caption: item.caption ?? null,
      permalink: item.permalink,
      timestamp: new Date(item.timestamp),
    }));
}
