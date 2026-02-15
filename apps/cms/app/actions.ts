"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabase, getSupabaseConfigError, objToSnake } from "@/lib/db/supabase-data";
import { fetchInstagramMedia } from "@/lib/instagram";
import { uploadImageFile } from "@/lib/storage";

function safeRedirect(type: "success" | "error", message: string): never {
  redirect(`/?${type}=${encodeURIComponent(message)}`);
}

function redirectTo(path: string, type: "success" | "error", message: string): never {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

async function getRequiredSupabase() {
  if (getSupabaseConfigError()) {
    safeRedirect("error", "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  const sb = await getSupabase();
  if (!sb) safeRedirect("error", "Missing Supabase configuration.");
  return sb;
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalText(formData: FormData, key: string) {
  const value = getText(formData, key);
  return value.length > 0 ? value : null;
}

function getBool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const raw = getText(formData, key);
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function parseDateTime(formData: FormData, key: string) {
  const raw = getText(formData, key);
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseVenueTag(formData: FormData): "rob_roy" | "konfusion" | "both" {
  const raw = getText(formData, "venueTag");
  if (raw === "rob_roy" || raw === "konfusion") return raw;
  return "both";
}

function getImageFile(formData: FormData, key: string) {
  const value = formData.get(key);
  if (!value || typeof value === "string") return null;
  if (value.size === 0) return null;
  return value;
}

async function resolveImageUrl(
  formData: FormData,
  fileKey: string,
  urlKey: string,
  folder: string,
  required = false,
) {
  const file = getImageFile(formData, fileKey);
  if (file) return uploadImageFile(file, folder);

  const url = getOptionalText(formData, urlKey);
  if (required && !url) {
    safeRedirect("error", "Please upload an image or provide an image URL.");
  }
  return url;
}

function validatePerformerVenueRules(performerType: string, venueTag: string | null) {
  if ((venueTag === "konfusion" || venueTag === "both") && performerType !== "dj") {
    safeRedirect(
      "error",
      "Konfusion is DJ-only. For band or solo artist, use Rob Roy venue scope.",
    );
  }
}

export async function createPerformer(formData: FormData) {
  const sb = await getRequiredSupabase();
  const name = getText(formData, "name");
  const performerType = getText(formData, "performerType");
  const bio = getText(formData, "bio");
  const venueTag = getOptionalText(formData, "venueTag") ?? "both";
  const profileImageUrl = await resolveImageUrl(
    formData,
    "profileImageFile",
    "profileImageUrl",
    "performers",
    true,
  );

  if (!name || !performerType || !bio || !profileImageUrl) {
    safeRedirect("error", "Performer name, type, bio, and profile image are required.");
  }
  validatePerformerVenueRules(performerType, venueTag);

  const { error } = await sb.from("performers").insert(
    objToSnake({
      name,
      performerType,
      bio,
      profileImageUrl,
      genre: getOptionalText(formData, "genre"),
      instagramHandle: getOptionalText(formData, "instagramHandle"),
      spotifyUrl: getOptionalText(formData, "spotifyUrl"),
      soundcloudUrl: getOptionalText(formData, "soundcloudUrl"),
      venueTag,
      isFeatured: getBool(formData, "isFeatured"),
      isAlumni: getBool(formData, "isAlumni"),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Performer created.");
}

export async function deletePerformer(id: string) {
  const sb = await getRequiredSupabase();
  const { error } = await sb.from("performers").delete().eq("id", id);
  if (error) redirectTo("/performers", "error", error.message);
  revalidatePath("/");
  revalidatePath("/performers");
  redirectTo("/performers", "success", "Performer deleted.");
}

export async function updatePerformer(formData: FormData) {
  const sb = await getRequiredSupabase();
  const id = getText(formData, "id");
  if (!id) redirectTo("/performers", "error", "Missing performer id.");
  const name = getText(formData, "name");
  const performerType = getText(formData, "performerType");
  const bio = getText(formData, "bio");
  const venueTag = getOptionalText(formData, "venueTag") ?? "both";
  validatePerformerVenueRules(performerType, venueTag);

  let profileImageUrl = await resolveImageUrl(
    formData,
    "profileImageFile",
    "profileImageUrl",
    "performers",
    false,
  );
  if (!profileImageUrl) {
    const { data } = await sb.from("performers").select("profile_image_url").eq("id", id).single();
    profileImageUrl = (data as { profile_image_url?: string } | null)?.profile_image_url ?? null;
  }
  if (!name || !performerType || !bio || !profileImageUrl) {
    redirectTo("/performers", "error", "Performer name, type, bio, and profile image are required.");
  }

  const { error } = await sb
    .from("performers")
    .update(
      objToSnake({
        name,
        performerType,
        bio,
        profileImageUrl,
        genre: getOptionalText(formData, "genre"),
        instagramHandle: getOptionalText(formData, "instagramHandle"),
        spotifyUrl: getOptionalText(formData, "spotifyUrl"),
        soundcloudUrl: getOptionalText(formData, "soundcloudUrl"),
        venueTag,
        isFeatured: getBool(formData, "isFeatured"),
        isAlumni: getBool(formData, "isAlumni"),
      }),
    )
    .eq("id", id);
  if (error) redirectTo("/performers", "error", error.message);

  revalidatePath("/");
  revalidatePath("/performers");
  redirectTo("/performers", "success", "Performer updated.");
}

export async function createEvent(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const recurringDay = getOptionalText(formData, "recurringDay");
  const eventDate = parseDateTime(formData, "eventDate");

  if (!title) {
    safeRedirect("error", "Title is required.");
  }
  if (!recurringDay && !eventDate) {
    safeRedirect("error", "Event date is required for one-off events. For recurring events, set Recurring day and Start/End time.");
  }

  const posterImageUrl = await resolveImageUrl(
    formData,
    "posterImageFile",
    "posterImageUrl",
    "events",
  );

  const payload: Record<string, unknown> = {
    venueTag,
    title,
    description: getOptionalText(formData, "description"),
    startTime: getOptionalText(formData, "startTime"),
    endTime: getOptionalText(formData, "endTime"),
    performerId: getOptionalText(formData, "performerId"),
    eventType: getOptionalText(formData, "eventType"),
    coverCharge: getOptionalText(formData, "coverCharge"),
    posterImageUrl,
    status: getOptionalText(formData, "status") ?? "published",
    recurringDay,
  };
  if (eventDate) {
    payload.eventDate = eventDate.toISOString();
  }

  const { error } = await sb.from("events").insert(objToSnake(payload));
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Event created.");
}

export async function deleteEvent(id: string) {
  const sb = await getRequiredSupabase();
  const { error } = await sb.from("events").delete().eq("id", id);
  if (error) redirectTo("/events", "error", error.message);
  revalidatePath("/");
  revalidatePath("/events");
  redirectTo("/events", "success", "Event deleted.");
}

export async function updateEvent(formData: FormData) {
  const sb = await getRequiredSupabase();
  const id = getText(formData, "id");
  if (!id) redirectTo("/events", "error", "Missing event id.");
  const title = getText(formData, "title");
  const recurringDay = getOptionalText(formData, "recurringDay");
  const eventDate = parseDateTime(formData, "eventDate");
  if (!title) {
    redirectTo("/events", "error", "Title is required.");
  }
  if (!recurringDay && !eventDate) {
    redirectTo("/events", "error", "Event date is required for one-off events. For recurring, set Recurring day and Start/End time.");
  }

  let posterImageUrl = await resolveImageUrl(
    formData,
    "posterImageFile",
    "posterImageUrl",
    "events",
    false,
  );
  if (!posterImageUrl) {
    const { data } = await sb.from("events").select("poster_image_url").eq("id", id).single();
    posterImageUrl = (data as { poster_image_url?: string } | null)?.poster_image_url ?? null;
  }

  const payload: Record<string, unknown> = {
    venueTag: parseVenueTag(formData),
    title,
    description: getOptionalText(formData, "description"),
    startTime: getOptionalText(formData, "startTime"),
    endTime: getOptionalText(formData, "endTime"),
    performerId: getOptionalText(formData, "performerId"),
    eventType: getOptionalText(formData, "eventType"),
    coverCharge: getOptionalText(formData, "coverCharge"),
    posterImageUrl,
    status: getOptionalText(formData, "status") ?? "published",
    recurringDay,
  };
  if (eventDate) {
    payload.eventDate = eventDate.toISOString();
  } else {
    payload.eventDate = null;
  }

  const { error } = await sb.from("events").update(objToSnake(payload)).eq("id", id);
  if (error) redirectTo("/events", "error", error.message);

  revalidatePath("/");
  revalidatePath("/events");
  redirectTo("/events", "success", "Event updated.");
}

export async function createDeal(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const description = getText(formData, "description");

  if (!title || !description) {
    safeRedirect("error", "Deal title and description are required.");
  }

  const imageUrl = await resolveImageUrl(formData, "imageFile", "imageUrl", "deals");

  const { error } = await sb.from("deals").insert(
    objToSnake({
      venueTag,
      title,
      description,
      dayOfWeek: getOptionalText(formData, "dayOfWeek"),
      startTime: getOptionalText(formData, "startTime"),
      endTime: getOptionalText(formData, "endTime"),
      isActive: getBool(formData, "isActive"),
      imageUrl,
      displayOrder: getInt(formData, "displayOrder", 0),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Drink deal created.");
}

export async function deleteDeal(id: string) {
  const sb = await getRequiredSupabase();
  const { error } = await sb.from("deals").delete().eq("id", id);
  if (error) redirectTo("/deals", "error", error.message);
  revalidatePath("/");
  revalidatePath("/deals");
  redirectTo("/deals", "success", "Deal deleted.");
}

export async function updateDeal(formData: FormData) {
  const sb = await getRequiredSupabase();
  const id = getText(formData, "id");
  if (!id) redirectTo("/deals", "error", "Missing deal id.");
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  if (!title || !description) {
    redirectTo("/deals", "error", "Deal title and description are required.");
  }

  let imageUrl = await resolveImageUrl(formData, "imageFile", "imageUrl", "deals", false);
  if (!imageUrl) {
    const { data } = await sb.from("deals").select("image_url").eq("id", id).single();
    imageUrl = (data as { image_url?: string } | null)?.image_url ?? null;
  }

  const { error } = await sb
    .from("deals")
    .update(
      objToSnake({
        venueTag: parseVenueTag(formData),
        title,
        description,
        dayOfWeek: getOptionalText(formData, "dayOfWeek"),
        startTime: getOptionalText(formData, "startTime"),
        endTime: getOptionalText(formData, "endTime"),
        isActive: getBool(formData, "isActive"),
        imageUrl,
        displayOrder: getInt(formData, "displayOrder", 0),
      }),
    )
    .eq("id", id);
  if (error) redirectTo("/deals", "error", error.message);

  revalidatePath("/");
  revalidatePath("/deals");
  redirectTo("/deals", "success", "Deal updated.");
}

export async function createGalleryImage(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const imageUrl = await resolveImageUrl(
    formData,
    "imageFile",
    "imageUrl",
    "gallery",
    true,
  );
  if (!imageUrl) safeRedirect("error", "Image URL is required.");

  const { error } = await sb.from("gallery_images").insert(
    objToSnake({
      venueTag,
      imageUrl,
      caption: getOptionalText(formData, "caption"),
      eventId: getOptionalText(formData, "eventId"),
      category: getOptionalText(formData, "category"),
      isFeatured: getBool(formData, "isFeatured"),
      displayOrder: getInt(formData, "displayOrder", 0),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Gallery image created.");
}

export async function createVideo(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const videoUrl = getText(formData, "videoUrl");
  if (!title || !videoUrl) {
    safeRedirect("error", "Title and video URL are required.");
  }

  const thumbnailUrl = await resolveImageUrl(
    formData,
    "thumbnailFile",
    "thumbnailUrl",
    "videos",
  );

  const { error } = await sb.from("videos").insert(
    objToSnake({
      venueTag,
      title,
      videoUrl,
      thumbnailUrl,
      performerId: getOptionalText(formData, "performerId"),
      eventId: getOptionalText(formData, "eventId"),
      isFeatured: getBool(formData, "isFeatured"),
      displayOrder: getInt(formData, "displayOrder", 0),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Video created.");
}

export async function createPost(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const content = getText(formData, "content");
  if (!title || !content) safeRedirect("error", "Post title and content are required.");

  const imageUrl = await resolveImageUrl(formData, "imageFile", "imageUrl", "posts");
  const publishedAt = parseDateTime(formData, "publishedAt");

  const { error } = await sb.from("posts").insert(
    objToSnake({
      venueTag,
      title,
      content,
      excerpt: getOptionalText(formData, "excerpt"),
      imageUrl,
      isPublished: getBool(formData, "isPublished"),
      publishedAt: publishedAt ? publishedAt.toISOString() : null,
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Post created.");
}

export async function createOperatingHour(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const dayOfWeek = getText(formData, "dayOfWeek");
  if (!dayOfWeek) safeRedirect("error", "Day of week is required.");

  const { error } = await sb.from("operating_hours").insert(
    objToSnake({
      venueTag,
      dayOfWeek,
      openTime: getOptionalText(formData, "openTime"),
      closeTime: getOptionalText(formData, "closeTime"),
      isClosed: getBool(formData, "isClosed"),
      displayOrder: getInt(formData, "displayOrder", 0),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Operating hours row created.");
}

export async function createSpecialOffering(formData: FormData) {
  const sb = await getRequiredSupabase();
  const venueTag = parseVenueTag(formData);
  const offeringType = getText(formData, "offeringType");
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  if (!offeringType || !title || !description) {
    safeRedirect("error", "Type, title and description are required.");
  }

  const imageUrl = await resolveImageUrl(
    formData,
    "imageFile",
    "imageUrl",
    "special-offerings",
  );

  const { error } = await sb.from("special_offerings").insert(
    objToSnake({
      venueTag,
      offeringType,
      title,
      description,
      imageUrl,
      ctaText: getOptionalText(formData, "ctaText"),
      ctaLink: getOptionalText(formData, "ctaLink"),
      isActive: getBool(formData, "isActive"),
      displayOrder: getInt(formData, "displayOrder", 0),
    }),
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Special offering created.");
}

export async function upsertVenueContent(formData: FormData) {
  const sb = await getRequiredSupabase();
  const contentKey = getText(formData, "contentKey");
  const content = getText(formData, "content");
  if (!contentKey || !content) safeRedirect("error", "Content key and content are required.");

  const venueTag = parseVenueTag(formData);

  const { error } = await sb.from("venue_content").upsert(
    objToSnake({
      venueTag,
      contentKey,
      content,
      label: getOptionalText(formData, "label"),
    }) as Record<string, unknown>,
    { onConflict: "venue_tag,content_key" },
  );
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Venue content saved.");
}

export async function toggleInstagramVisibility(formData: FormData) {
  const sb = await getRequiredSupabase();
  const id = getText(formData, "id");
  const isVisible = getBool(formData, "isVisible");
  if (!id) safeRedirect("error", "Instagram post id is required.");

  const { error } = await sb
    .from("instagram_posts")
    .update(
      objToSnake({
        isVisible,
        venueTag: getOptionalText(formData, "venueTag"),
        displayOrder: getInt(formData, "displayOrder", 0),
      }),
    )
    .eq("id", id);
  if (error) safeRedirect("error", error.message);

  revalidatePath("/");
  safeRedirect("success", "Instagram post updated.");
}

export async function syncInstagramPosts() {
  const sb = await getRequiredSupabase();
  const media = await fetchInstagramMedia();

  if (media.length === 0) {
    safeRedirect("error", "Instagram sync returned no media.");
  }

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
    if (error) safeRedirect("error", error.message);
  }

  revalidatePath("/");
  safeRedirect("success", `Instagram sync imported ${media.length} posts.`);
}
