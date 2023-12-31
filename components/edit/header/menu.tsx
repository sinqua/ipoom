"use client";
import Image from "next/image";

import uploadImg from "@/app/assets/images/upload.svg";
import { useEffect } from "react";
import useDrag from "@/hooks/useDrag";

export default function Menu({ children }: { children: React.ReactNode }) {
  let { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div
      className="relative flex items-end w-full h-full space-x-[32px] ph:text-[18px] text-[16px] font-semibold whitespace-nowrap overflow-x-scroll scrollbar-hide"
      {...dragEvents}
      ref={dragRef}
    >
      {children}
    </div>
  );
}
