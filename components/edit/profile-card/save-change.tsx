"use client";
import { supabase, supabaseAuth } from "@/lib/database";
import { validateNickname } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";

const SaveChange = forwardRef(function SaveChange(props: any, ref: any) {
  const { data: session, status } = useSession();


  const handleClick = async () => {
    if (props.label === "thumbnail") {
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

        const { data: thumbnailData, error: thumbnailError } =
          await supabase
            .from("profiles")
            .update({ image: fileData?.path })
            .eq("user_id", session?.user.id);
      }

      return;
    }

    if (props.label === "nickname") {
      const nickname = ref.current.value;

      if (nickname !== session?.user.nickname) {
        const result = await validateNickname(nickname);

        if (result) return;
      }

      const { data: nicknameData, error: nicknameError } = await supabaseAuth
        .from("users")
        .update({ nickname: nickname })
        .eq("id", session?.user.id);

      return;
    }

    if (props.label === "kakao") {
      const kakao = ref.current.value;

      const { data: kakaoLinkData, error: kakaoLinkError } = await supabase
        .from("links")
        .update({ kakao: kakao })
        .eq("user_id", session?.user.id);

      return;
    }

    if (props.label === "toss") {
      const toss = ref.current.value;

      const { data: tossLinkData, error: tossLinkError } = await supabase
        .from("links")
        .update({ toss: toss })
        .eq("user_id", session?.user.id);
      return;
    }

    if (props.label === "tags") {
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
