"use client";
import { useEffect } from "react";
import useDrag from "@/hooks/useDrag";

export default function Menu({ children }: { children: React.ReactNode }) {
  let { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div
      className="relative ph:flex hidden items-end w-full h-full space-x-[32px] ph:text-[18px] font-semibold whitespace-nowrap overflow-x-scroll scrollbar-hide"
      {...dragEvents}
      ref={dragRef}
    >
      {children}
    </div>
  );
}
