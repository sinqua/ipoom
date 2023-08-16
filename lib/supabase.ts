import { supabase, supabaseAuth } from "./database";

export const getUser = async (id: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select(`*`)
    .eq("id", id)
    .limit(1)
    .single();

  if (data) return data;
  else {
    throw new Error("User not found");
  }
};

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
  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`image`)
    .eq("user_id", id);

  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  if (profileData![0].image) {
    return { image: `${profileData![0].image}` };
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
  const { data } = await supabase.storage.from("quill").getPublicUrl(filename);

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
};

export const validateNickname = async (nickname: string) => {
  const { data, error } = await supabaseAuth
    .from("users")
    .select(`*`)
    .eq("nickname", nickname);

  if (data) return data.length > 0 ? true : false;
  else {
    throw new Error("User not found");
  }
};

export const getMainAvatar = async (id: string) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .select(`*`)
    .eq("user_id", id)
    .eq("is_profile", true)
    .limit(1)
    .single();

  if (avatarData) {
    const { data: animationData, error: animationError } = await supabase
      .from("animations")
      .select("name")
      .eq("id", avatarData.animation)
      .limit(1)
      .single();

    const { data: tagData, error: tagError } = await supabase
      .from("tags")
      .select("tag")
      .eq("avatar_id", avatarData.id);

    const tags = tagData?.map((tag: any) => Object.values(tag)[0]) || [];

    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

    let url = `${SupabasePublicURL}/thumbnail/${
      avatarData.user_id + "/" + avatarData.thumbnail
    }`;
    if (avatarData.thumbnail === null) url = "/VerticalModel.png";

    return { ...avatarData, tags, animationData, thumbnailUrl: url };
  } else return null;
};

export const getPortfolios = async (id: string) => {
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from("avatars")
    .select(`*`)
    .eq("user_id", id)
    .eq("is_profile", false);

  const portfolios = [];
  for (const portfolio of portfoliosData!) {
    const { data: animationData, error: animationError } = await supabase
      .from("animations")
      .select("name")
      .eq("id", portfolio.animation)
      .limit(1)
      .single();

    const { data: tagData, error: tagError } = await supabase
      .from("tags")
      .select("tag")
      .eq("avatar_id", portfolio.id);

    const tags = tagData?.map((tag: any) => Object.values(tag)[0]) || [];

    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

    let url = `${SupabasePublicURL}/thumbnail/${
      portfolio.user_id + "/" + portfolio.thumbnail
    }`;
    if (portfolio.thumbnail === null) url = "/VerticalModel.png";

    const newPortfolio = {
      ...portfolio,
      tags,
      animationData,
      thumbnailUrl: url,
    };
    portfolios.push(newPortfolio);
  }

  portfolios.sort((a, b) => {
    const dateA = new Date(a.updated_at!);
    const dateB = new Date(b.updated_at!);
    return dateB.getTime() - dateA.getTime();
  });

  return portfolios;
};
