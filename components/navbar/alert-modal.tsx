"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function AlertModal({ setIsOpen }: { setIsOpen: any }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#00000085] z-40 pointer-events-auto"
      onClick={() => setIsOpen(false)}
    >
      <div className="inline-flex flex-col w-[300px] h-[400px] bg-[#FFFFFF] rounded-[8px] pointer-events-none z-50">
        <div className="flex justify-between items-center w-full p-[16px]">
          <p className="text-[16px] font-semibold">알림</p>
          <p className="text-[12px] text-[#2778C7] font-semibold cursor-pointer">
            모두 읽음으로 표시
          </p>
        </div>
        <Separator />
        <div className="flex flex-col grow overflow-y-scroll">
          <div className="flex flex-col">
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
            <div className="h-[100px]">asdfasdf</div>
          </div>
        </div>
      </div>
    </div>
  );
}
