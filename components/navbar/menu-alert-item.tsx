"use client";
import Image from "next/image";
import { useState } from "react";
import AlertModal from "./alert-modal";
import AlertAlarm from "../alert-alarm";

export default function AlertItem({
  children,
  imgSrc,
}: {
  children: React.ReactNode;
  imgSrc: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
        <p className="text-[16px]">{children}</p>
      </div>
      {/* {isOpen && <AlertModal setIsOpen={setIsOpen} />} */}
      {isOpen && <AlertAlarm isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
