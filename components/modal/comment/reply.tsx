"use client";
import { addComment, getCommentProfile } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import moreImg from "@/app/assets/images/more.svg";
import CommentInfo from "./info";

interface ReplyProps {
  userId: any;
  reply: any;
}

export default async function Reply({ userId, reply }: ReplyProps) {
  const profile = await getCommentProfile(reply.writer_id);

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-[16px]">
          <Image
            src={profile.image!}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={512}
            height={512}
            alt=""
          />
          <p className="font-semibold text-[18px]">{profile.nickname}</p>
        </div>
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          {/* <Image src={moreImg} className="w-[24px] h-[24px]" alt="" /> */}
        </div>
      </div>
      <div className="flex flex-col pl-[56px] space-y-[16px]">
        <p className="text-[14px] whitespace-pre-line">{reply.content}</p>
        {/* <CommentInfo userId={userId} comment={comment} /> */}
      </div>
    </div>
  );
}
