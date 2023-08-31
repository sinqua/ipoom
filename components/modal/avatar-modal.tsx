"use client";
import Image from "next/image";
import ModalCanvas from "@/components/modal/avatar-modal-canvas";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";

export default function AvatarModal({
  avatar,
  modelUrl,
}: {
  avatar: any;
  modelUrl: any;
}) {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div className="relative flex justify-center w-full h-full pt-[80px] dt:px-[32px] ph:px-[16px] px-0 ph:overflow-hidden overflow-y-scroll">
        <Background />
        <div className="relative w-full dt:max-w-[1288px] max-w-none h-ful bg-gray-300 rounded-t-[10px]">
          <div className="w-full ph:h-full h-auto flex ph:flex-row flex-col rounded-t-[10px] overflow-hidden">
            <div className="relative ph:grow grow-0 ph:h-full h-[550px]">
              <ModalCanvas
                modelUrl={modelUrl?.signedUrl}
                animation={avatar.animation}
              />
            </div>
            <div className="flex flex-col shrink-0 ph:w-[352px] w-full ph:h-full h-auto p-[24px] space-y-[24px] bg-[#FFFFFF]">
              <p className="text-[24px] font-semibold">{avatar.name}</p>
              <div className="flex flex-col space-y-[40px]">
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">아바타 설명</p>
                  <p className="leading-[25px]">{avatar.description}</p>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">태그</p>
                  <div className="flex flex-wrap w-full">
                    {avatar.tags.map((item: any, index: any) => {
                      return (
                        <div
                          className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap"
                          key={index}
                        >
                          {item.tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">썸네일</p>
                  <div className="relative flex w-full aspect-[8/7] rounded-[10px] overflow-hidden">
                    <Image
                      src={avatar.thumbnailUrl}
                      className="object-cover w-full h-full"
                      width={512}
                      height={512}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">업로드</p>
                  <p>{formatFullDate(avatar.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
