"use client";
import { useEffect } from "react";
import useDrag from "@/hooks/useDrag";

export default function Menu({ children }: { children: React.ReactNode }) {
  let { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    
    console.log("menu3");
    setMountedStatus(true);
  }, []);

  return (
    <div
      className="relative flex w-full h-full space-x-[32px] ph:text-[18px] text-[16px] font-semibold whitespace-nowrap overflow-x-scroll scrollbar-hide"
      {...dragEvents}
      ref={dragRef}
    >
      {children}
    </div>
  );
}
