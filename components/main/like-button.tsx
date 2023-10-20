"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useState } from "react";
import AlertLogin from "../alert-login";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";

interface LikeButtonProps {
  userId: any;
  likes: any;
}

export default function LikeButton({ userId, likes }: LikeButtonProps) {
  const checkLikeStatus = (): Boolean => {
    // if (!userId) return false;

    const result = likes.filter((item: any) => item.user_id === userId);

    if (result.length > 0) return true;
    else return false;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [likeStatus, setLikeStatus] = useState(checkLikeStatus());

  return (
    <>
      <Image
        src={likeStatus ? HeartFillImg : HeartLineImg}
        className="absolute top-[8px] right-[8px] w-[24px] h-[24px] cursor-pointer"
        width={512}
        height={512}
        alt=""
      />
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
