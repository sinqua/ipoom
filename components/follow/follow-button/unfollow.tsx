"use client";
import Image from "next/image";
import checkImg from "@/app/assets/images/check_black.svg";

import { deleteFollow } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

interface UnfollowProps {
  userId: string;
  setFollowStatus: any;
}

export default function Unfollow({
  userId,
  setFollowStatus,
}: UnfollowProps) {
  const supabase = createClientComponentClient<Database>();

  const onClickUnfollowButton = async (
    event: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await deleteFollow(user?.id!, userId);

    setFollowStatus(false);
  };

  return (
    <div
      className="flex justify-center items-center max-w-[200px] ph:w-full w-[70px] ph:h-[42px] h-[35px] ph:space-x-[16px] ph:mt-[16px] bg-[#E9E9E9] hover:bg-[#D4D4D4] rounded-[10px] cursor-pointer"
      onClick={(e) => onClickUnfollowButton(e, userId)}
    >
      <Image
        src={checkImg}
        width={512}
        height={512}
        className="ph:block hidden w-[20px] h-[20px]"
        alt=""
      />
      <p className="text-[14px] text-[#333333]">팔로잉</p>
    </div>
  );
}
