"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useEffect, useState } from "react";
import AlertLogin from "../alert-login";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

interface LikeButtonProps {
  avatarId: any;
}

export default function LikeButton({ avatarId }: LikeButtonProps) {
  const supabase = createClientComponentClient<Database>();
  const [isOpen, setIsOpen] = useState(false);
  const [likeStatus, setLikeStatus] = useState<boolean>(true);

  const onClickLikeButton = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsOpen(true);
      return;
    }

    if (likeStatus) {
      await deleteLike(user.id, avatarId);

      // setLikeCount(likeCount - 1);
      setLikeStatus(false);
    } else {
      await addLike(user.id, avatarId);

      // setLikeCount(likeCount + 1);
      setLikeStatus(true);
    }
  };

  return (
    <>
      <Image
        src={likeStatus ? HeartFillImg : HeartLineImg}
        className="absolute top-[8px] right-[8px] w-[24px] h-[24px] cursor-pointer"
        width={512}
        height={512}
        alt=""
        onClick={onClickLikeButton}
      />
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
