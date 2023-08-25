"use client";
import { supabase, supabaseAuth } from "@/lib/database";
import { generatePublicUrl, validateNickname } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";

const SaveChange = forwardRef(function SaveChange(props: any, ref: any) {
  const { data: session, status } = useSession();

  const handleClick = async () => {
    if (props.label === "thumbnail") {
      handleSaveThumbnail(session, ref);

      return;
    }

    if (props.label === "nickname") {
      handleSaveNickname(session, ref);

      return;
    }

    if (props.label === "description") {
      handleSaveDescription(session, ref);

      return;
    }

    if (props.label === "kakao") {
      handleSaveKakaoLink(session, ref);

      return;
    }

    if (props.label === "toss") {
      handleSaveTossLink(session, ref);

      return;
    }

    if (props.label === "tags") {
      handleSaveTags(session, props);

      return;
    }
  };

  return (
    <button
      className="flex justify-center items-center w-[60px] h-[47px] text-white bg-[#368ADC] rounded-[10px]"
      onClick={handleClick}
    >
      저장
    </button>
  );
});

export default SaveChange;

const handleSaveThumbnail = async (session: any, ref: any) => {
  const file = ref.current.files[0];

  if (file) {
    var uuid = uuidv4();

    const filepath = `${session?.user.id}/${uuid}.png`;

    const { data: fileData, error: fileError } = await supabase.storage
      .from("profile-image")
      .upload(filepath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    const url = generatePublicUrl('profile-image', fileData?.path!);

    const { data: thumbnailData, error: thumbnailError } = await supabase
      .from("profiles")
      .update({ image: url })
      .eq("user_id", session?.user.id);
  }
};

const handleSaveNickname = async (session: any, ref: any) => {
  const nickname = ref.current.value;

  if (nickname !== session?.user.nickname) {
    const result = await validateNickname(nickname);

    if (result) return;
  }

  const { data: nicknameData, error: nicknameError } = await supabaseAuth
    .from("users")
    .update({ nickname: nickname })
    .eq("id", session?.user.id);
};

const handleSaveDescription = async (session: any, ref: any) => {
  const description = ref.current.value;

  const { data: descriptionData, error: descriptionError } = await supabase
    .from("profiles")
    .update({ description: description })
    .eq("user_id", session?.user.id);
};

const handleSaveKakaoLink = async (session: any, ref: any) => {
  const kakao = ref.current.value;

  const { data: kakaoLinkData, error: kakaoLinkError } = await supabase
    .from("links")
    .update({ kakao: kakao })
    .eq("user_id", session?.user.id);
};

const handleSaveTossLink = async (session: any, ref: any) => {
  const toss = ref.current.value;

  const { data: tossLinkData, error: tossLinkError } = await supabase
    .from("links")
    .update({ toss: toss })
    .eq("user_id", session?.user.id);
};

const handleSaveTags = async (session: any, props: any) => {
  const tags = props.tags;

  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("user_id", session?.user.id)
    .limit(1)
    .single();

  const { data: tagsData, error: tagsError } = await supabase
    .from("tags")
    .insert(
      tags
        .map((tag: any) => {
          return tag.value;
        })
        .map((tag: any) => {
          return { tag: tag, profile_id: profileData!.id };
        })
    );
};
