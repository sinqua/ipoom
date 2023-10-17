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
  const onClickUnfollowButton = async (event: React.MouseEvent<HTMLElement>, sessionId: string, userId: string) => {
    event.preventDefault();

    await deleteFollow(sessionId, userId);

    setFollowStatus(false);
  };

  return (
    <div
      className="flex justify-center items-center w-[200px] h-[42px] space-x-[16px] mt-[16px] bg-[#E9E9E9] hover:bg-[#D4D4D4] rounded-[10px] cursor-pointer"
      onClick={(e) => onClickUnfollowButton(e, sessionId!, userId)}
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
