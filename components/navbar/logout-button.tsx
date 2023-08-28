"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function LogoutButton({ imgSrc }: { imgSrc: string }) {
  return (
    <div
      className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
      onClick={() => signOut()}
    >
      <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
      <p className="text-[16px]">로그아웃</p>
    </div>
  );
}
