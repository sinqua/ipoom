"use client";
import Image from "next/image";
import Link from "next/link";
import userImg from "@/app/assets/images/user_white.svg";

interface ProfileEditProps {
  userId: string;
}

export default function ProfileEdit({ userId }: ProfileEditProps) {
  return (
    <Link
      href={`${userId}/edit`}
      className="flex grow justify-center items-center h-[42px] space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
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
