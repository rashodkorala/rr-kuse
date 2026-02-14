import { createClient } from "@sanity/client";

export type SiteSettings = {
  siteName?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  announcementEnabled?: boolean;
  announcementText?: string;
  instagramUrl?: string;
};

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_PROJECT_ID ??
  "ppsg7ml5";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_DATASET ??
  "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-02-14";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const siteSettingsQuery = `coalesce(
  *[_type == "siteSettings" && _id == "siteSettings"][0],
  *[_type == "siteSettings"][0]
){
  siteName,
  defaultSeoTitle,
  defaultSeoDescription,
  announcementEnabled,
  announcementText,
  instagramUrl
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(
      siteSettingsQuery,
    );
    return settings;
  } catch {
    // Keep the web app functional when CMS env vars are missing
    return null;
  }
}
