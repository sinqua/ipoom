"use client";
import Image from "next/image";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { useEffect, useState } from "react";
import Viewer from "./viewer";
import CommentSection from "./comment-section";
import CopyButton from "./copy-button";
import LikeButton from "./like-button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function AvatarModal({
  userId,
  avatar,
  modelUrl,
  comments,
}: {
  userId: any;
  avatar: any;
  modelUrl: any;
  comments: any;
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
        <Background onCloseModal={null} />
        <div className="relative w-full dt:max-w-[1288px] max-w-none h-ful bg-gray-300 rounded-t-[10px]">
          <div className="w-full ph:h-full h-auto flex ph:flex-row flex-col rounded-t-[10px] overflow-hidden">
            <div className="relative ph:grow grow-0 ph:h-full h-[550px]">
              <Viewer
                modelUrl={modelUrl?.signedUrl}
                animation={numberToStringMap[avatar.animation]}
                toolbarCss={
                  "absolute flex flex-row h-fit ph:top-[40px] bottom-[24px] ph:right-[40px] right-[24px] space-x-[16px] pointer-events-auto"
                }
              />
            </div>
            <div className="flex flex-col shrink-0 ph:w-[352px] w-full ph:h-full h-auto p-[24px] space-y-[24px] bg-[#FFFFFF] overflow-y-scroll scrollbar-hide">
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold">{avatar.name}</p>
                <div className="flex items-center space-x-[24px]">
                  <CopyButton />
                  <LikeButton
                    userId={userId}
                    avatarId={avatar.id}
                    likes={avatar.likes}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-[40px]">
                <div className="flex flex-col space-y-[16px]">
                  <p className="text-[16px] font-semibold text-[#9D9D9D]">
                    아바타 설명
                  </p>
                  <p className="leading-[25px]">{avatar.description}</p>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="text-[16px] font-semibold text-[#9D9D9D]">
                    태그
                  </p>
                  <div className="flex flex-wrap w-full">
                    {avatar.tags.map((item: any, index: any) => {
                      return (
                        <div
                          className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] text-[14px] whitespace-nowrap"
                          key={index}
                        >
                          {item.tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="text-[16px] font-semibold text-[#9D9D9D]">
                    썸네일
                  </p>
                  <div className="relative flex w-full aspect-[8/7] rounded-[10px] overflow-hidden">
                    <Image
                      src={avatar.thumbnail}
                      className="object-cover w-full h-full"
                      width={512}
                      height={512}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="text-[16px] font-semibold text-[#9D9D9D]">
                    업로드
                  </p>
                  <p>{formatFullDate(avatar.created_at)}</p>
                </div>
                <CommentSection
                  userId={userId}
                  avatarId={avatar.id}
                  comments={comments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const numberToStringMap: { [key: number]: string } = {
  1: "HipHopDancing",
  2: "PutYourHandsUp",
  3: "Thankful",
  4: "Idle",
};
