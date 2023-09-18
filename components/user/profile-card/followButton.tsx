"use client";
import Image from "next/image";
import Link from "next/link";
import followImg from "@/app/assets/images/follow_white.svg";
import checkImg from "@/app/assets/images/check_black.svg";
import userImg from "@/app/assets/images/user_white.svg";

import { addFollow, deleteFollow } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface FollowButtonProps {
  sessionId: string | undefined;
  userId: string;
  status: boolean;
}

export default function FollowButton({
  sessionId,
  userId,
  status,
}: FollowButtonProps) {
  const [followStatus, setFollowStatus] = useState(status);

  const onClickFollowButton = async (sessionId: string, userId: string) => {
    const result = await addFollow(sessionId, userId);

    setFollowStatus(result);
  };

  const onClickUnfollowButton = async (sessionId: string, userId: string) => {
    await deleteFollow(sessionId, userId);

    setFollowStatus(false);
  };

  return sessionId !== userId ? (
    !followStatus ? (
      <div
        className="flex grow justify-center items-center h-[42px] space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
        onClick={() =>
          sessionId
            ? onClickFollowButton(sessionId!, userId)
            : console.log("로그인이 필요한 기능입니다.")
        }
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
    ) : (
      <div
        className="flex justify-center items-center w-[200px] h-[42px] space-x-[16px] bg-[#E9E9E9] hover:bg-[#D4D4D4] rounded-[10px] cursor-pointer"
        onClick={() => onClickUnfollowButton(sessionId!, userId)}
      >
        <Image
          src={checkImg}
          width={512}
          height={512}
          className="w-[20px] h-[20px]"
          alt=""
        />
        <p className="text-[14px] text-[#333333]">팔로잉</p>
      </div>
    )
  ) : (
    <Link
      href={`${userId}/edit`}
      className="flex justify-center items-center w-[200px] h-[42px] space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
    >
      <Image
        src={userImg}
        width={512}
        height={512}
        className="w-[20px] h-[20px]"
        alt=""
      />
      <p className="text-[14px] text-[#FFFFFF]">프로필 수정</p>
    </Link>
  );
}
