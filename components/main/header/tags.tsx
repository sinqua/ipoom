"use client";
import Image from "next/image";
import leftImg from "@/app/assets/images/left_white.svg";
import rightImg from "@/app/assets/images/right_white.svg";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { isMobile } from 'react-device-detect';
import { useRouter } from "next/navigation";


export default function Tags({ tags }: { tags: any }) {
  const router = useRouter();

  const scrollLeftRef = useRef<HTMLDivElement>(null);
  const scrollRightRef = useRef<HTMLDivElement>(null);

  // rename
  const [isInit, setIsInit] = useState(true);

  const scrollToLeft = () => {
    scrollLeftRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });

    setIsInit(true);
  };

  const scrollToRight = () => {
    scrollRightRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });

    setIsInit(false);
  };

  return (
    <div className="relative flex shrink-0 justify-center w-full tb:h-[85px] h-[60px]">
      <div
        className={cn(
          "absolute flex dt:max-w-[1008px] w-full tb:h-[85px] h-[60px]",
          isMobile ? "overflow-x-scroll scrollbar-hide" : "overflow-hidden"
        )}
      >
        <div ref={scrollLeftRef} className="shrink-0 dt:w-0 w-[16px]"></div>
        <div className="flex items-center h-full space-x-[16px]">
          {tags.map((item: any, index: number) => {
            return (
              <div
                className="flex flex-col items-center tb:px-[24px] px-[8px] tb:py-[8px] py-[4px] space-y-[3px] bg-[#8B55D1] rounded-[8px] text-[#FFFFFF] cursor-pointer whitespace-nowrap"
                key={index}
                onClick={() => router.push("/privacy")}
              >
                <p>{`#${item.tag}`}</p>
                <p className="tb:block hidden">{item.count}</p>
              </div>
            );
          })}
        </div>
        <div ref={scrollRightRef} className="shrink-0 dt:w-0 w-[16px]"></div>
      </div>
      {!isMobile && (
        <div className="absolute top-0 flex justify-between items-center dt:max-w-[1008px] w-full tb:h-[85px] h-[60px] overflow-x-scroll scrollbar-hide pointer-events-none">
          {isInit ? (
            <div></div>
          ) : (
            <div className="flex items-center h-full pl-[16px] bg-gradient-to-r from-white">
              <div
                className="flex justify-center items-center w-[32px] h-[32px] bg-[#00000060] rounded-full cursor-pointer pointer-events-auto"
                onClick={scrollToLeft}
              >
                <Image
                  draggable={false}
                  src={leftImg}
                  className="w-auto h-[16px]"
                  width={512}
                  height={512}
                  alt=""
                />
              </div>
            </div>
          )}
          {isInit ? (
            <div className="flex items-center h-full pr-[16px] bg-gradient-to-l from-white">
              <div
                className="flex justify-center items-center w-[32px] h-[32px] bg-[#00000060] rounded-full cursor-pointer pointer-events-auto"
                onClick={scrollToRight}
              >
                <Image
                  draggable={false}
                  src={rightImg}
                  className="w-auto h-[16px]"
                  width={512}
                  height={512}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
