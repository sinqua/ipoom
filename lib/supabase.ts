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

export const getPortfolios = async (id: string) => {
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from("avatars")
    .select(`*, tags (*), animations (*)`)
    .eq("user_id", id)

  const portfolios = [];
  for (const portfolio of portfoliosData!) {
    let url = "";
    if (portfolio.thumbnail === null) url = "/VerticalModel.png";
    else { url = portfolio.thumbnail; }

    const newPortfolio = {
      ...portfolio,
      thumbnailUrl: url,
    };
    portfolios.push(newPortfolio);
  }

  portfolios.sort((a, b) => {
    const dateA = new Date(a.created_at!);
    const dateB = new Date(b.created_at!);
    return dateB.getTime() - dateA.getTime();
  });

  return portfolios;
};

export const getAvatar = async (id: string) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .select("*, tags (tag)")
    .eq("id", id)
    .limit(1)
    .single();

  if (avatarData) {
    let url = "";
    if (avatarData.thumbnail === null) url = "/VerticalModel.png";
    else { url = avatarData.thumbnail; }

    return { ...avatarData, thumbnailUrl: url };
  } else return null;
};

export const createModelUrl = async (userId: string, filename: any) => {
  if (!filename) return { signedUrl: "" };

  const filepath = `${userId}/${filename}`;
  const { data, error } = await supabase.storage
    .from("optimize")
    .createSignedUrl(filepath, 3600);

  if (data) return data;
  else {
    throw new Error("Model not found");
  }
};
