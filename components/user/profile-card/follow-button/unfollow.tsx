"use client";
import Image from "next/image";
import checkImg from "@/app/assets/images/check_black.svg";

import { deleteFollow } from "@/lib/supabase";

interface UnfollowProps {
  sessionId: string | undefined;
  userId: string;
  setFollowStatus: any;
}

export default function Unfollow({
  sessionId,
  userId,
  setFollowStatus,
}: UnfollowProps) {
  const onClickUnfollowButton = async (sessionId: string, userId: string) => {
    await deleteFollow(sessionId, userId);

    setFollowStatus(false);
  };

  return (
    <div
      className="flex grow justify-center items-center h-[42px] space-x-[16px] bg-[#E9E9E9] hover:bg-[#D4D4D4] rounded-[10px] cursor-pointer"
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
  );
}
