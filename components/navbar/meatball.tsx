"use client";
import Image from "next/image";
import { useState } from "react";

import moreImg from "@/app/assets/images2/more.svg";

export default function Meatball() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
      <div className="flex flex-col w-[152px] border-solid border-[1px] rounded-[8px] bg-white ">
        <button className="w-[152px] h-[40px] text-[14px] text-[#333333]">마이페이지</button>
        <button className="w-[152px] h-[40px] text-[14px] text-[#333333]">로그아웃</button>
      </div>
  );
}
