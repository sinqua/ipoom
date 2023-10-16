"use client";
import { supabase } from "@/lib/database";
import { generatePublicUrl, validateNickname } from "@/lib/supabase";
import React, { forwardRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import checkImg from "@/app/assets/images/check_black.svg";
import FadeLoader from "react-spinners/FadeLoader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SaveChange = forwardRef(function SaveChange(props: any, ref: any) {
  const [status, setStatus] = useState("");

  const supabase = createClientComponentClient();

  const handleClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setStatus("save");

    if (props.label === "thumbnail") {
      await handleSaveThumbnail(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "background") {
      await handleSaveBackground(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "nickname") {
      await handleSaveNickname(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "description") {
      await handleSaveDescription(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "kakao") {
      await handleSaveKakaoLink(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "twitter") {
      await handleSaveTwitterLink(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "toss") {
      await handleSaveTossLink(user?.id, ref);
      setStatus("done");

      return;
    }

    if (props.label === "tags") {
      await handleSaveTags(user?.id, props);
      setStatus("done");

      return;
    }
  };

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        setStatus("");
      }, 1000);
    }
  }, [status]);

  return (
    <>
      <button
        className="flex justify-center items-center shrink-0 w-[60px] h-[47px] text-white bg-[#368ADC] rounded-[10px]"
        onClick={handleClick}
      >
        저장
      </button>
      {status !== "" && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 !m-0">
          <div className="flex justify-center items-center w-[180px] h-[180px] bg-[#FFFFFF] rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
            <div className="flex flex-col items-center space-y-[24px]">
              {status === "save" ? (
                <>
                  <FadeLoader
                    color="#2778C7"
                    className="!left-[22.5px] !w-[55px] !h-[55px]"
                  />
                  <p className="text-[18px] font-semibold">저장 중</p>
                </>
              ) : (
                <>
                  <Image src={checkImg} alt="" />
                  <p className="text-[18px] font-semibold">저장 완료</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default SaveChange;

const handleSaveThumbnail = async (userId: any, ref: any) => {
  const file = ref.current.files[0];

  if (file) {
    var uuid = uuidv4();

    const filepath = `${userId}/${uuid}.png`;

    const { data: fileData, error: fileError } = await supabase.storage
      .from("profile-image")
      .upload(filepath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    const url = generatePublicUrl("profile-image", fileData?.path!);

    const { data: thumbnailData, error: thumbnailError } = await supabase
      .from("profiles")
      .update({ image: url })
      .eq("user_id", userId);
  }
};

const handleSaveBackground = async (userId: any, ref: any) => {
  const file = ref.current.files[0];

  if (file) {
    var uuid = uuidv4();

    const filepath = `${userId}/${uuid}.png`;

    const { data: fileData, error: fileError } = await supabase.storage
      .from("background-image")
      .upload(filepath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    const url = generatePublicUrl("background-image", fileData?.path!);

    const { data: thumbnailData, error: thumbnailError } = await supabase
      .from("profiles")
      .update({ background: url })
      .eq("user_id", userId);
  }
};

const handleSaveNickname = async (userId: any, ref: any) => {
  const nickname = ref.current.value;

  const { data: profileData } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .limit(1)
    .single();

  if (nickname !== profileData!.nickname) {
    const result = await validateNickname(nickname);

    if (result) return;
  }

  const { data: nicknameData, error: nicknameError } = await supabase
    .from("profiles")
    .update({ nickname: nickname })
    .eq("user_id", userId);
};

const handleSaveDescription = async (userId: any, ref: any) => {
  const description = ref.current.value;

  const { data: descriptionData, error: descriptionError } = await supabase
    .from("profiles")
    .update({ description: description })
    .eq("user_id", userId);
};

const handleSaveKakaoLink = async (userId: any, ref: any) => {
  const kakao = ref.current.value;

  const { data: kakaoLinkData, error: kakaoLinkError } = await supabase
    .from("links")
    .update({ kakao: kakao })
    .eq("user_id", userId);
};

const handleSaveTwitterLink = async (userId: any, ref: any) => {
  const twitter = ref.current.value;

  const { data: twitterLinkData, error: twitterLinkError } = await supabase
    .from("links")
    .update({ twitter: twitter })
    .eq("user_id", userId);
};

const handleSaveTossLink = async (userId: any, ref: any) => {
  const toss = ref.current.value;

  const { data: tossLinkData, error: tossLinkError } = await supabase
    .from("links")
    .update({ toss: toss })
    .eq("user_id", userId);
};

const handleSaveTags = async (userId: any, props: any) => {
  const tags = props.tags;

  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("user_id", userId)
    .limit(1)
    .single();

  const { data: deleteTagsData, error: deleteTagsError } = await supabase
    .from("tags")
    .delete()
    .eq("profile_id", profileData!.id);

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
