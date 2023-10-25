import { supabase } from "./database";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// const cookieStore = cookies();
// const supabase = createServerComponentClient({ cookies: () => cookieStore });

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

  return data;

  // if (data) return data;
  // else {
  //   // throw new Error("Profile not found");
  //   return null;
  // }
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
    .eq("target_user_id", userId);

  if (data!.length > 0) return true;
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

// rename
export const getPortfolios = async (id: string) => {
  const { data: portfoliosData, error: portfoliosError } = await supabase
    .from("avatars")
    .select(`*, tags (*), animations (*)`)
    .eq("user_id", id);

  const portfolios = [];
  for (const portfolio of portfoliosData!) {
    if (portfolio.thumbnail === null)
      portfolio.thumbnail = "/VerticalModel.png";

    portfolios.push(portfolio);
  }

  portfolios.sort((a, b) => {
    const dateA = new Date(a.created_at!);
    const dateB = new Date(b.created_at!);
    return dateB.getTime() - dateA.getTime();
  });

  return portfolios;
};

// rename
export const getMainTags = async () => {
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

  const slicedCountByGroupTag = Object.fromEntries(countArray);

  const options = Object.keys(slicedCountByGroupTag).map((tag: any) => {
    return { tag: tag, count: slicedCountByGroupTag[tag] };
  });

  return options.slice(0, 10);
};

// rename
export const getAllAvatars = async () => {
  const { data: avatarsData, error: avatarsError } = await supabase
    .from("avatars")
    .select("*, tags (tag), likes (*)");

  if (avatarsData) {
    const avatars = [];

    for (const avatar of avatarsData!) {
      const user = await getProfile(avatar.user_id!);

      if (avatar.thumbnail === null) avatar.thumbnail = "/VerticalModel.png";

      const newAvatar: any = {
        ...avatar,
        user: user,
      };
      avatars.push(newAvatar);
    }

    return avatars;
  } else {
    throw new Error("Avatar not found");
  }
};

export const getAvatar = async (id: string) => {
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatars")
    .select("*, tags (tag), likes (*)")
    .eq("id", id)
    .limit(1)
    .single();

  if (avatarData) {
    if (avatarData.thumbnail === null)
      avatarData.thumbnail = "/VerticalModel.png";

    return avatarData;
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
  const { data: followData, error: followError } = await supabase
    .from("follows")
    .insert([
      {
        source_user_id: sessionId,
        target_user_id: userId,
      },
    ])
    .select("*")
    .single();

  await supabase.from("alarm_follows").insert([
    {
      source_user_id: sessionId,
      target_user_id: userId,
      follow_id: followData.id,
    },
  ]);

  if (followData) return true;
  else return false;
};

export const deleteFollow = async (sessionId: string, userId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .delete()
    .eq("source_user_id", sessionId)
    .eq("target_user_id", userId);

  if (error) throw new Error("Delete Follow Failed!");
};

export const getComments = async (avatarId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, replies (*)")
    .eq("avatar_id", avatarId);

  if (data) return data;
  else {
    throw new Error("Comments not Found!");
  }
};

export const addComment = async (
  id: string,
  avatarId: string,
  content: string
) => {
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .insert([
      {
        writer_id: id,
        avatar_id: avatarId,
        content: content,
      },
    ])
    .select("*, replies (*), avatars (*)")
    .single();

  if (id !== commentData.avatars.user_id) {
    await supabase.from("alarm_comments").insert([
      {
        source_user_id: id,
        target_user_id: commentData.avatars.user_id,
        avatar_id: avatarId,
        comment_id: commentData.id,
      },
    ]);
  }

  if (commentData) return commentData;
  else {
    throw new Error("Insert Comment Failed!");
  }
};

export const addReply = async (
  id: string,
  commentId: string,
  content: string
) => {
  const { data: replyData, error: replyError } = await supabase
    .from("replies")
    .insert([
      {
        writer_id: id,
        comment_id: commentId,
        content: content,
      },
    ])
    .select("*, comments (*)")
    .single();

  if (id !== replyData.comments.writer_id) {
    await supabase.from("alarm_replies").insert([
      {
        source_user_id: id,
        target_user_id: replyData.comments.writer_id,
        avatar_id: replyData.comments.avatar_id,
        reply_id: replyData.id,
      },
    ]);
  }

  if (replyData) return replyData;
  else {
    throw new Error("Insert Reply Failed!");
  }
};

export const addLike = async (id: string, avatarId: string) => {
  const { data: likeData, error: likeError } = await supabase
    .from("likes")
    .insert([
      {
        user_id: id,
        target_avatar_id: avatarId,
      },
    ])
    .select("*, avatars (*)")
    .single();

  if (id !== likeData.avatars.user_id) {
    await supabase.from("alarm_likes").insert([
      {
        source_user_id: id,
        target_user_id: likeData.avatars.user_id,
        avatar_id: avatarId,
        like_id: likeData.id,
      },
    ]);
  }

  if (likeData) return likeData;
  else {
    throw new Error("Insert Like Failed!");
  }
};

export const deleteLike = async (id: string, avatarId: string) => {
  console.log(id, avatarId);

  const { data, error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", id)
    .eq("target_avatar_id", avatarId);

  if (error) throw new Error("Delete Like Failed!");
};

export const getFollowingUsers = async (userId: string) => {
  const { data: followsData, error: followsError } = await supabase
    .from("follows")
    .select("*")
    .eq("source_user_id", userId)
    .order("created_at", { ascending: false });

  let followingUsers: any[] = [];

  if (followsData) {
    for (const follow of followsData) {
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", follow.target_user_id)
        .limit(1)
        .single();

      const { data: avatarsData, error: avatarsError } = await supabase
        .from("avatars")
        .select("*")
        .eq("user_id", userData?.user_id!);

      const newUser: any = {
        ...userData,
        avatarCount: avatarsData?.length,
      };

      followingUsers.push(newUser);
    }

    return followingUsers;
  } else {
    throw new Error("Users not found");
  }
};

export const getLikesAvatars = async (userId: string) => {
  const { data: likesData } = await supabase
    .from("likes")
    .select("*, avatars (*)")
    .eq("user_id", userId);

  let likesAvatars: any[] = [];

  if (likesData) {
    for (const like of likesData) {
      const { data: tagsData } = await supabase
        .from("tags")
        .select("*")
        .eq("avatar_id", like.avatars.id);

      const { data: user } = await supabase
        .from("profiles")
        .select(`*,  tags (tag)`)
        .eq("user_id", like.avatars.user_id)
        .single();

      if (like.avatars.thumbnail === null)
        like.avatars.thumbnail = "/VerticalModel.png";

      const newAvatar: any = {
        ...like.avatars,
        user: user,
        tags: tagsData,
      };

      likesAvatars.push(newAvatar);
    }

    return likesAvatars;
  } else {
    throw new Error("Avatars not found");
  }
};
