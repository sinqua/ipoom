"use client";
import Image from "next/image";
import useDrag from "@/hooks/useDrag";
import { useEffect } from "react";

import emptyImg from "@/app/assets/images/empty.png";

const avatarTags = [
  { value: "VRC", label: "VRC" },
  { value: "blender", label: "blender" },
  { value: "트위치 방송", label: "트위치 방송" },
  { value: "이세계아이돌", label: "이세계아이돌" },
];

export default function Card() {
  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div className="flex ph:flex-row flex-col p-[24px] ph:space-x-[24px] space-x-0 rounded-[10px] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
      <p className="ph:hidden block text-[20px] font-bold mb-[24px]">RRddang</p>
      <Image
        src={emptyImg}
        className="shrink-0 ph:w-[394px] w-full h-fit aspect-[8/7] !m-0 rounded-[10px]"
        width={0}
        height={0}
        alt=""
      />
      <div className="relative flex flex-col grow tb:h-[345px] h-auto justify-between tb:space-y-0 space-y-[40px]">
        <div className="flex flex-col w-full space-y-[16px]">
          <p className="ph:block hidden text-[20px] font-bold">RRddang</p>
          <div className="flex flex-wrap justify-between w-full">
            <div className="flex space-x-[8px]">
              <p className="text-[#7B7B7B]">업로드</p>
              <p className="font-semibold">2023.01.01</p>
            </div>
            <div className="flex space-x-[8px]">
              <p className="text-[#7B7B7B]">상태</p>
              <p className="font-semibold">공개</p>
            </div>
            <div className="flex space-x-[8px]">
              <p className="text-[#7B7B7B]">애니메이션</p>
              <p className="font-semibold">HiphopDance</p>
            </div>
          </div>
        </div>
        <div className="relative flex tb:flex-row flex-col tb:space-x-[24px] space-x-0 tb:space-y-0 space-y-[24px]">
          <div className="relative flex flex-col w-full space-y-[16px]">
            <p className="text-[20px] font-bold">아바타 설명</p>
            <p className="w-full break-all">
              버츄얼 아이돌 이세돌의 주르르 입니다. ^~^ 생방송은 트위치에서! 앙
              트위띠~
            </p>
          </div>
          <div className="relative flex flex-col w-full space-y-[32px]">
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[20px] font-bold">아바타</p>
              <p>Anon.vrm</p>
            </div>
            <div className="relative flex flex-col space-y-[16px]">
              <p className="text-[20px] font-bold">태그</p>
              <div className="w-full h-[30px]">
                <div
                  className="absolute flex flex-row w-full space-x-[10px] whitespace-nowrap overflow-x-scroll scrollbar-hide text-[14px]"
                  {...dragEvents}
                  ref={dragRef}
                >
                  {avatarTags.map((tag: any, index: any) => {
                    return (
                      <div
                        className="inline-flex px-[8px] py-[4px] bg-[#E9E9E9] rounded-[8px] whitespace-nowrap cursor-grabbing"
                        key={index}
                      >
                        {tag.value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex ph:w-auto w-full space-x-[16px]">
            <div className="flex justify-center items-center ph:w-[116px] w-1/2 h-[42px] rounded-[10px] bg-[#FFFFFF] border-[1px] border-solid border-[#D4D4D4] cursor-pointer">
              삭제하기
            </div>
            <div className="flex justify-center items-center ph:w-[116px] w-1/2 h-[42px] rounded-[10px] bg-[#368ADC] text-[#FFFFFF] cursor-pointer">
              수정하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
