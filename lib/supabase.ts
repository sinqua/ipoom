import { supabase, supabaseAuth } from "./database";

export const generatePublicUrl = (storage: string, path: string) => {
  const supabasePublic = `https://${process.env.NEXT_PUBLIC_SUPABASE_NAME}/storage/v1/object/public`;
  return `${supabasePublic}/${storage}/${path}`;
};

export const getMostUsedTags = async () => {
  const { data, error } = await supabase
    .from("tags")
    .select("*", { count: "exact" });

  const countByGroupTag: any = {};
  data!.forEach((row) => {
    const tag = row.tag!;
    if (countByGroupTag[tag]) {
      countByGroupTag[tag]++;
    } else {
      countByGroupTag[tag] = 1;
    }
  });
  const countArray = Object.entries(countByGroupTag);
  countArray.sort((a: any, b: any) => b[1] - a[1]);

  const slicedCountByGroupTag = Object.fromEntries(countArray.slice(0, 5));

  const options = Object.keys(slicedCountByGroupTag).map((tag: any) => {
    return { value: tag, label: tag };
  });

  return options;
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

export const getFollowStatus = async (sessionId: string, userId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select(`*`)
    .eq("source_user_id", sessionId)
    .eq("target_user_id", userId)
    .limit(1)
    .single();

  if (data) return true;
  else return false;
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
  const { data, error } = await supabase
    .from("profiles")
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
    .eq("user_id", id);

  const portfolios = [];
  for (const portfolio of portfoliosData!) {
    let url = "";
    if (portfolio.thumbnail === null) url = "/VerticalModel.png";
    else {
      url = portfolio.thumbnail;
    }

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
    else {
      url = avatarData.thumbnail;
    }

    return { ...avatarData, thumbnailUrl: url };
  } else {
    throw new Error("Avatar not found");
  }
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

export const insertAvatar = async (
  userId: any,
  fileName: any,
  avatarName: any,
  avatarDescription: any,
  visible: any,
  animation: any
) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .insert([
      {
        vrm: fileName,
        user_id: userId,
        name: avatarName,
        description: avatarDescription,
        visible: visible,
        animation: animation,
        optimized: false,
      },
    ])
    .select();

  if (avatarData) return avatarData;
  else {
    throw new Error("Insert Avatar Failed!");
  }
};

export const deleteAvatar = async (avatarId: any) => {
  const { data, error } = await supabase
    .from("avatars")
    .delete()
    .eq("id", avatarId);

  if (error) throw new Error("Delete Avatar Failed!");
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

export const updateAvatarThumbnail = async (
  userId: any,
  uuid: any,
  avatarId: any
) => {
  const { data, error } = await supabase
    .from("avatars")
    .update({
      thumbnail: generatePublicUrl("thumbnail", `${userId}/${uuid}.png`),
    })
    .eq("id", avatarId);

  if (error) throw new Error("Upload Avatar Failed!");
};

export const updateAvatar = async (
  avatarId: any,
  avatarName: any,
  avatarDescription: any,
  visible: any,
  animation: any
) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .update({
      name: avatarName,
      description: avatarDescription,
      visible: visible,
      animation: animation,
    })
    .eq("id", avatarId)
    .select();

  if (avatarData) return avatarData;
  else {
    throw new Error("Upload Avatar Failed!");
  }
};

export const updateAvatarName = async (avatarId: any, avatarName: any) => {
  const { error: avatarError } = await supabase
    .from("avatars")
    .update({
      vrm: avatarName,
    })
    .eq("id", avatarId);

  if (avatarError) throw new Error("Upload Avatar Failed!");
};

export const updateAvatarTags = async (avatarId: any, avatarTags: any) => {
  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("avatar_id", avatarId);

  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .insert(
      avatarTags
        .map((tag: any) => {
          return tag.value;
        })
        .map((tag: any) => {
          return { tag: tag, avatar_id: avatarId };
        })
    );

  if (tagsError) throw tagsError;
};

export const addFollow = async (sessionId: string, userId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .insert([
      {
        source_user_id: sessionId,
        target_user_id: userId,
      },
    ])
    .select();

  if (data) return true;
  else return false;
};

export const deleteFollow = async (sessionId: string, userId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .delete()
    .eq("source_user_id", sessionId)
    .eq("target_user_id", userId);

  if (error) throw new Error("Delete Foolow Failed!");
};
