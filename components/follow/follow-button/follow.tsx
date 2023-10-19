"use client";
import Image from "next/image";
import followImg from "@/app/assets/images/follow_white.svg";
import { addFollow } from "@/lib/supabase";
import { useState } from "react";
import AlertLogin from "@/components/alert-login";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

interface FollowProps {
  userId: string;
  setFollowStatus: any;
}

export default function Follow({ userId, setFollowStatus }: FollowProps) {
  const supabase = createClientComponentClient<Database>();
  const [isOpen, setIsOpen] = useState(false);

  const onClickFollowButton = async (
    event: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsOpen(true);
      return;
    }

    const result = await addFollow(user.id, userId);
    setFollowStatus(result);
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-[200px] h-[42px] ph:mt-[16px] ph:space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
        onClick={(e) => onClickFollowButton(e, userId)}
      >
        <Image
          src={followImg}
          width={512}
          height={512}
          className="ph:block hidden w-[20px] h-[20px]"
          alt=""
        />
        <p className="text-[14px] text-[#FFFFFF]">팔로우</p>
      </div>
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
