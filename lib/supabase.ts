import { supabase, supabaseAuth } from "./database";

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

export const getUserProfileImage = async (id: string) => {
  const SupabasePublicURL = "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public"

  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`image`)
    .eq("user_id", id);

  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  if (profileData![0].image) {
    return { image: `${SupabasePublicURL}/profile-image/${profileData![0].image}`}
  } else {
    return authData![0];
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

export const validateNickname = async (nickname: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select(`*`)
    .eq("nickname", nickname);

  if (data) return data.length > 0 ? true : false;
  else {
    throw new Error("User not found");
  }
}