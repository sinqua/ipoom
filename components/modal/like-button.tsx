"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useState } from "react";
import AlertLogin from "../aler-login";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";

interface LikeButtonProps {
  userId: any;
  avatarId: any;
  likes: any;
}

export default function LikeButton({
  userId,
  avatarId,
  likes,
}: LikeButtonProps) {
  const checkLikeStatus = (): Boolean => {
    if (!userId) return false;

    const result = likes.filter((item: any) => item.user_id === userId);

    if (result.length > 0) return true;
    else return false;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeStatus, setLikeStatus] = useState(checkLikeStatus());

  const onClickLikeButton = async () => {
    if (!userId) {
      setIsOpen(true);
      return;
    }

    if (likeStatus) {
      await deleteLike(userId, avatarId);

      setLikeCount(likeCount - 1);
      setLikeStatus(false);
    } else {
      await addLike(userId, avatarId);

      setLikeCount(likeCount + 1);
      setLikeStatus(true);
    }
  };

  return (
    <>
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
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
