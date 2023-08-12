import { supabase } from "./database";

export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`*,  tags (tag)`)
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Profile not found");
  }
};

export const getLink = async (id: string) => {
  const { data, error } = await supabase
    .from("links")
    .select(`*`)
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("Links not found");
  }
};

export const getQuillUrl = async (filename: any) => {
  const { data } = await supabase.storage
    .from("quill")
    .getPublicUrl(filename)
    
  return data;
};

export const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select(`*`)
    .eq("user_id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("User not found");
  }
}