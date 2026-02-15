"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db/client";
import {
  deals,
  events,
  galleryImages,
  instagramPosts,
  operatingHours,
  performers,
  posts,
  specialOfferings,
  venueContent,
  videos,
} from "@/lib/db/schema";
import { fetchInstagramMedia } from "@/lib/instagram";
import { uploadImageFile } from "@/lib/storage";

function safeRedirect(type: "success" | "error", message: string): never {
  redirect(`/?${type}=${encodeURIComponent(message)}`);
}

function redirectTo(path: string, type: "success" | "error", message: string): never {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

function getRequiredDb() {
  const db = getDb();
  if (!db) safeRedirect("error", "Missing DATABASE_URL.");
  return db;
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
  const db = getRequiredDb();
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

  await db.insert(performers).values({
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
  });

  revalidatePath("/");
  safeRedirect("success", "Performer created.");
}

export async function deletePerformer(id: string) {
  const db = getRequiredDb();
  await db.delete(performers).where(eq(performers.id, id));
  revalidatePath("/");
  revalidatePath("/performers");
  redirectTo("/performers", "success", "Performer deleted.");
}

export async function updatePerformer(formData: FormData) {
  const db = getRequiredDb();
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
    const [row] = await db.select({ profileImageUrl: performers.profileImageUrl }).from(performers).where(eq(performers.id, id));
    profileImageUrl = row?.profileImageUrl ?? null;
  }
  if (!name || !performerType || !bio || !profileImageUrl) {
    redirectTo("/performers", "error", "Performer name, type, bio, and profile image are required.");
  }

  await db
    .update(performers)
    .set({
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
    })
    .where(eq(performers.id, id));

  revalidatePath("/");
  revalidatePath("/performers");
  redirectTo("/performers", "success", "Performer updated.");
}

export async function createEvent(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const eventDate = parseDateTime(formData, "eventDate");

  if (!title || !eventDate) {
    safeRedirect("error", "Title and event date are required.");
  }

  await db.insert(events).values({
    venueTag,
    title,
    description: getOptionalText(formData, "description"),
    eventDate,
    startTime: getOptionalText(formData, "startTime"),
    endTime: getOptionalText(formData, "endTime"),
    performerId: getOptionalText(formData, "performerId"),
    eventType: getOptionalText(formData, "eventType"),
    coverCharge: getOptionalText(formData, "coverCharge"),
    posterImageUrl: await resolveImageUrl(
      formData,
      "posterImageFile",
      "posterImageUrl",
      "events",
    ),
    status: getOptionalText(formData, "status") ?? "published",
    recurringDay: getOptionalText(formData, "recurringDay"),
  });

  revalidatePath("/");
  safeRedirect("success", "Event created.");
}

export async function deleteEvent(id: string) {
  const db = getRequiredDb();
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/");
  revalidatePath("/events");
  redirectTo("/events", "success", "Event deleted.");
}

export async function updateEvent(formData: FormData) {
  const db = getRequiredDb();
  const id = getText(formData, "id");
  if (!id) redirectTo("/events", "error", "Missing event id.");
  const title = getText(formData, "title");
  const eventDate = parseDateTime(formData, "eventDate");
  if (!title || !eventDate) {
    redirectTo("/events", "error", "Title and event date are required.");
  }

  let posterImageUrl = await resolveImageUrl(
    formData,
    "posterImageFile",
    "posterImageUrl",
    "events",
    false,
  );
  if (!posterImageUrl) {
    const [row] = await db.select({ posterImageUrl: events.posterImageUrl }).from(events).where(eq(events.id, id));
    posterImageUrl = row?.posterImageUrl ?? null;
  }

  await db
    .update(events)
    .set({
      venueTag: parseVenueTag(formData),
      title,
      description: getOptionalText(formData, "description"),
      eventDate,
      startTime: getOptionalText(formData, "startTime"),
      endTime: getOptionalText(formData, "endTime"),
      performerId: getOptionalText(formData, "performerId"),
      eventType: getOptionalText(formData, "eventType"),
      coverCharge: getOptionalText(formData, "coverCharge"),
      posterImageUrl,
      status: getOptionalText(formData, "status") ?? "published",
      recurringDay: getOptionalText(formData, "recurringDay"),
    })
    .where(eq(events.id, id));

  revalidatePath("/");
  revalidatePath("/events");
  redirectTo("/events", "success", "Event updated.");
}

export async function createDeal(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const description = getText(formData, "description");

  if (!title || !description) {
    safeRedirect("error", "Deal title and description are required.");
  }

  await db.insert(deals).values({
    venueTag,
    title,
    description,
    dayOfWeek: getOptionalText(formData, "dayOfWeek"),
    startTime: getOptionalText(formData, "startTime"),
    endTime: getOptionalText(formData, "endTime"),
    isActive: getBool(formData, "isActive"),
    imageUrl: await resolveImageUrl(formData, "imageFile", "imageUrl", "deals"),
    displayOrder: getInt(formData, "displayOrder", 0),
  });

  revalidatePath("/");
  safeRedirect("success", "Drink deal created.");
}

export async function deleteDeal(id: string) {
  const db = getRequiredDb();
  await db.delete(deals).where(eq(deals.id, id));
  revalidatePath("/");
  revalidatePath("/deals");
  redirectTo("/deals", "success", "Deal deleted.");
}

export async function updateDeal(formData: FormData) {
  const db = getRequiredDb();
  const id = getText(formData, "id");
  if (!id) redirectTo("/deals", "error", "Missing deal id.");
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  if (!title || !description) {
    redirectTo("/deals", "error", "Deal title and description are required.");
  }

  let imageUrl = await resolveImageUrl(formData, "imageFile", "imageUrl", "deals", false);
  if (!imageUrl) {
    const [row] = await db.select({ imageUrl: deals.imageUrl }).from(deals).where(eq(deals.id, id));
    imageUrl = row?.imageUrl ?? null;
  }

  await db
    .update(deals)
    .set({
      venueTag: parseVenueTag(formData),
      title,
      description,
      dayOfWeek: getOptionalText(formData, "dayOfWeek"),
      startTime: getOptionalText(formData, "startTime"),
      endTime: getOptionalText(formData, "endTime"),
      isActive: getBool(formData, "isActive"),
      imageUrl,
      displayOrder: getInt(formData, "displayOrder", 0),
    })
    .where(eq(deals.id, id));

  revalidatePath("/");
  revalidatePath("/deals");
  redirectTo("/deals", "success", "Deal updated.");
}

export async function createGalleryImage(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const imageUrl = await resolveImageUrl(
    formData,
    "imageFile",
    "imageUrl",
    "gallery",
    true,
  );
  if (!imageUrl) safeRedirect("error", "Image URL is required.");

  await db.insert(galleryImages).values({
    venueTag,
    imageUrl,
    caption: getOptionalText(formData, "caption"),
    eventId: getOptionalText(formData, "eventId"),
    category: getOptionalText(formData, "category"),
    isFeatured: getBool(formData, "isFeatured"),
    displayOrder: getInt(formData, "displayOrder", 0),
  });

  revalidatePath("/");
  safeRedirect("success", "Gallery image created.");
}

export async function createVideo(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const videoUrl = getText(formData, "videoUrl");
  if (!title || !videoUrl) {
    safeRedirect("error", "Title and video URL are required.");
  }

  await db.insert(videos).values({
    venueTag,
    title,
    videoUrl,
    thumbnailUrl: await resolveImageUrl(
      formData,
      "thumbnailFile",
      "thumbnailUrl",
      "videos",
    ),
    performerId: getOptionalText(formData, "performerId"),
    eventId: getOptionalText(formData, "eventId"),
    isFeatured: getBool(formData, "isFeatured"),
    displayOrder: getInt(formData, "displayOrder", 0),
  });

  revalidatePath("/");
  safeRedirect("success", "Video created.");
}

export async function createPost(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const title = getText(formData, "title");
  const content = getText(formData, "content");
  if (!title || !content) safeRedirect("error", "Post title and content are required.");

  await db.insert(posts).values({
    venueTag,
    title,
    content,
    excerpt: getOptionalText(formData, "excerpt"),
    imageUrl: await resolveImageUrl(formData, "imageFile", "imageUrl", "posts"),
    isPublished: getBool(formData, "isPublished"),
    publishedAt: parseDateTime(formData, "publishedAt"),
  });

  revalidatePath("/");
  safeRedirect("success", "Post created.");
}

export async function createOperatingHour(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const dayOfWeek = getText(formData, "dayOfWeek");
  if (!dayOfWeek) safeRedirect("error", "Day of week is required.");

  await db.insert(operatingHours).values({
    venueTag,
    dayOfWeek,
    openTime: getOptionalText(formData, "openTime"),
    closeTime: getOptionalText(formData, "closeTime"),
    isClosed: getBool(formData, "isClosed"),
    displayOrder: getInt(formData, "displayOrder", 0),
  });

  revalidatePath("/");
  safeRedirect("success", "Operating hours row created.");
}

export async function createSpecialOffering(formData: FormData) {
  const db = getRequiredDb();
  const venueTag = parseVenueTag(formData);
  const offeringType = getText(formData, "offeringType");
  const title = getText(formData, "title");
  const description = getText(formData, "description");
  if (!offeringType || !title || !description) {
    safeRedirect("error", "Type, title and description are required.");
  }

  await db.insert(specialOfferings).values({
    venueTag,
    offeringType,
    title,
    description,
    imageUrl: await resolveImageUrl(
      formData,
      "imageFile",
      "imageUrl",
      "special-offerings",
    ),
    ctaText: getOptionalText(formData, "ctaText"),
    ctaLink: getOptionalText(formData, "ctaLink"),
    isActive: getBool(formData, "isActive"),
    displayOrder: getInt(formData, "displayOrder", 0),
  });

  revalidatePath("/");
  safeRedirect("success", "Special offering created.");
}

export async function upsertVenueContent(formData: FormData) {
  const db = getRequiredDb();
  const contentKey = getText(formData, "contentKey");
  const content = getText(formData, "content");
  if (!contentKey || !content) safeRedirect("error", "Content key and content are required.");

  const venueTag = parseVenueTag(formData);
  await db
    .insert(venueContent)
    .values({
      venueTag,
      contentKey,
      content,
      label: getOptionalText(formData, "label"),
    })
    .onConflictDoUpdate({
      target: [venueContent.venueTag, venueContent.contentKey],
      set: {
        content,
        label: getOptionalText(formData, "label"),
      },
    });

  revalidatePath("/");
  safeRedirect("success", "Venue content saved.");
}

export async function toggleInstagramVisibility(formData: FormData) {
  const db = getRequiredDb();
  const id = getText(formData, "id");
  const isVisible = getBool(formData, "isVisible");
  if (!id) safeRedirect("error", "Instagram post id is required.");

  await db
    .update(instagramPosts)
    .set({
      isVisible,
      venueTag: getOptionalText(formData, "venueTag"),
      displayOrder: getInt(formData, "displayOrder", 0),
    })
    .where(eq(instagramPosts.id, id));

  revalidatePath("/");
  safeRedirect("success", "Instagram post updated.");
}

export async function syncInstagramPosts() {
  const db = getRequiredDb();
  const media = await fetchInstagramMedia();

  if (media.length === 0) {
    safeRedirect("error", "Instagram sync returned no media.");
  }

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

  revalidatePath("/");
  safeRedirect("success", `Instagram sync imported ${media.length} posts.`);
}
