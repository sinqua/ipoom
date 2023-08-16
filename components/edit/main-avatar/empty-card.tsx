"use client";
import Image from "next/image";
import useDrag from "@/hooks/useDrag";
import { useEffect } from "react";

import garyPlusImg from "@/app/assets/images/plus_gray.svg";
import { useSession } from "next-auth/react";

export default async function EmptyCard() {
  return (
    <div className="flex justify-center items-center w-[150px] h-[150px] bg-[#F1F1F1] rounded-[5px] cursor-pointer">
      <div className="flex flex-col items-center space-y-[16px]">
        <Image
          src={garyPlusImg}
          className="w-[40px] h-[40px]"
          width={0}
          height={0}
          alt=""
        />
        <p className="text-[16px] text-[#9D9D9D]">추가하기</p>
      </div>
    </div>
  );
}
