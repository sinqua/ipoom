"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useEffect, useState } from "react";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";

interface LikeButtonProps {
  session: any;
  avatarId: any;
  likes: any;
}

export default function LikeButton({
  session,
  avatarId,
  likes,
}: LikeButtonProps) {
  const checkLikeStatus = (): Boolean => {
    if (!session) return false;

    const result = likes.filter(
      (item: any) => item.user_id === session.user.id
    );

    if (result.length > 0) return true;
    else return false;
  };

  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeStatus, setLikeStatus] = useState(checkLikeStatus());

  useEffect(() => {
    console.log("likeStatus", likeStatus);
  }, [likeStatus]);

  const onClickLikeButton = async () => {
    if (session) {
      if (likeStatus) {
        await deleteLike(session.user.id, avatarId);

        setLikeCount(likeCount - 1);
        setLikeStatus(false);
      } else {
        console.log("asdf");

        await addLike(session.user.id, avatarId);

        setLikeCount(likeCount + 1);
        setLikeStatus(true);
      }
    } else {
      console.log("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <div
      className="flex items-center space-x-[8px]"
      onClick={onClickLikeButton}
    >
      <Image
        src={likeStatus ? HeartFillImg : HeartLineImg}
        className="w-[24px] h-[24px] cursor-pointer"
        width={512}
        height={512}
        alt=""
      />
      <p className="font-semibold text-[14px] text-[#FF4E4E]">{likeCount}</p>
    </div>
  );
}
