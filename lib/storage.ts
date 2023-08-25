import { supabase } from "./database";
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";

export const CreateQuillUrl = async (filename: any) => {
  const { data } = await supabase.storage
    .from("quill")
    .getPublicUrl(filename)
    
  return data;
};

// Upload file using standard upload
export async function UploadAvatarFile(
  userId: any,
  filename: any,
  file: any
) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}

export async function UploadAvatarThumbnailFile(
  userId: any,
  url: any,
) {
  const base64Data = url.split(",")[1];

  const uuid = uuidv4();

  const { data, error } = await supabase.storage
    .from("thumbnail")
    .upload(`${userId}/${uuid}.png`, decode(base64Data), {
      contentType: "image/png",
    });

  return uuid;
}

// Upload file using standard upload
export async function UploadQuillImage(userId: any, filename: any, file: any) {
  const filepath = `${userId}/${filename}`;

  // Convert base64 to binary data
  const binaryData = atob(file.split("base64,")[1]);

  // Create a Uint8Array to hold the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array]);

  const { data, error } = await supabase.storage
    .from("quill")
    .upload(filepath, blob, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}
