"use client";
import Image from "next/image";
import followImg from "@/app/assets/images/follow_white.svg";
import { addFollow } from "@/lib/supabase";
import { useState } from "react";
import AlertLogin from "@/components/aler-login";

interface FollowProps {
  sessionId: string | undefined;
  userId: string;
  setFollowStatus: any;
}

export default function Follow({
  sessionId,
  userId,
  setFollowStatus,
}: FollowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickFollowButton = async (event: React.MouseEvent<HTMLElement>, sessionId: string, userId: string) => {
    event.preventDefault();

    if (!sessionId) {
      setIsOpen(true);
      return;
    }

    const result = await addFollow(sessionId, userId);
    setFollowStatus(result);
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-[200px] h-[42px] mt-[16px] space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
        onClick={(e) => onClickFollowButton(e, sessionId!, userId)}
      >
        <Image
          src={followImg}
          width={512}
          height={512}
          className="w-[20px] h-[20px]"
          alt=""
        />
        <p className="text-[14px] text-[#FFFFFF]">팔로우</p>
      </div>
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
