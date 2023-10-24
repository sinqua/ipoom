"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useEffect, useState } from "react";
import AlertLogin from "../../alert-login";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

interface LikeButtonProps {

  likes: any;
}

export default function LikeButton({ likes }: LikeButtonProps) {
  const supabase = createClientComponentClient<Database>();

  const checkLikeStatus = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const result = likes.filter(
      (item: any) => item.user_id === session?.user.id
    );

    if (result.length > 0) setLikeStatus(true);
    else setLikeStatus(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    checkLikeStatus();
  }, [likes]);

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
