import { createClient } from "@/lib/supabase/server";

const storageBucket = process.env.SUPABASE_STORAGE_BUCKET ?? "cms-assets";

export async function uploadImageFile(file: File, folder: string) {
  const client = await createClient();

  if (!file.type.startsWith("image/")) {
    throw new Error("Uploaded file must be an image.");
  }

  const extension = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await client.storage.from(storageBucket).upload(path, file, {
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = client.storage.from(storageBucket).getPublicUrl(path);
  return data.publicUrl;
}
