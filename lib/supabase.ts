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
    .select(`*, tags (*), animations (*)`)
    .eq("user_id", id)
    .eq("is_profile", true)
    .limit(1)
    .single();

  if (avatarData) {
    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

    let url = `${SupabasePublicURL}/thumbnail/${
      avatarData.user_id + "/" + avatarData.thumbnail
    }`;
    if (avatarData.thumbnail === null) url = "/VerticalModel.png";

    return { ...avatarData, thumbnailUrl: url };
  } else return null;
};

export const getPortfolios = async (id: string) => {
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from("avatars")
    .select(`*, tags (*), animations (*)`)
    .eq("user_id", id)
    .eq("is_profile", false);

  const portfolios = [];
  for (const portfolio of portfoliosData!) {
    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

    let url = `${SupabasePublicURL}/thumbnail/${
      portfolio.user_id + "/" + portfolio.thumbnail
    }`;
    if (portfolio.thumbnail === null) url = "/VerticalModel.png";

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
    const SupabasePublicURL =
      "https://tpwylybqvkzcsrmbctnj.supabase.co/storage/v1/object/public";

    let url = `${SupabasePublicURL}/thumbnail/${
      avatarData.user_id + "/" + avatarData.thumbnail
    }`;
    if (avatarData.thumbnail === null) url = "/VerticalModel.png";

    return { ...avatarData, thumbnailUrl: url };
  } else return null;
};

export const createModelUrl = async (userId: string, filename: any) => {
  if (!filename) return { signedUrl: "" };

  const filepath = `${userId}/${filename}`;

  console.log("filepath", filepath);

  const { data, error } = await supabase.storage
    .from("optimize")
    .createSignedUrl(filepath, 3600);

  if (data) return data;
  else {
    throw new Error("Model not found");
  }
};

export const addAvatar = async (
  userId: any,
  avatarFile: any,
  avatarName: any,
  avatarDescription: any,
  visible: any,
  animation: any
) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .insert([
      {
        vrm: avatarFile.name,
        user_id: userId,
        name: avatarName,
        description: avatarDescription,
        visible: visible,
        animation: animation,
      },
    ])
    .select();

  if (avatarData) return avatarData;
  else {
    throw new Error("Upload Avatar Failed!");
  }
};

export const addAvatarTags = async (avatar_id: any, avatarTags: any) => {
  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .insert(
      avatarTags
        .map((tag: any) => {
          return tag.value;
        })
        .map((tag: any) => {
          return { tag: tag, avatar_id: avatar_id };
        })
    );

  if (tagsError) throw new Error("Upload AvatarTags Failed!");
};

export const updateAvatarThumbnail = async (uuid: any, avatarId: any) => {
  const { data, error } = await supabase
    .from("avatars")
    .update({
      thumbnail: `${uuid}.png`,
    })
    .eq("id", avatarId);

  if (error) throw new Error("Upload Avatar Failed!");
};
