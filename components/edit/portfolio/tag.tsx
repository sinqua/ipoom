"use client";
import useDrag from "@/hooks/useDrag";
import { useEffect } from "react";

export default function Tag({ tags }: { tags: any }) {
  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    
    console.log("tag2");
    setMountedStatus(true);
  }, []);

  return (
    <div
      className="absolute flex flex-row w-full space-x-[10px] whitespace-nowrap overflow-x-scroll scrollbar-hide text-[14px]"
      {...dragEvents}
      ref={dragRef}
    >
      {tags.map((item: any, index: any) => {
        return (
          <div
            className="inline-flex px-[8px] py-[4px] bg-[#E9E9E9] rounded-[8px] whitespace-nowrap cursor-grabbing"
            key={index}
          >
            {item.tag}
          </div>
        );
      })}
    </div>
  );
}
