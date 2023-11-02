"use client";
import { motion } from "framer-motion";
import EventViewer from "../modal/event-viewer";
import { createModelUrl } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";
import redHeartImg from "@/app/assets/images/contest/red_heart.png";

export default function RankingAvatar({
  avatar,
  index,
}: {
  avatar: any;
  index: number;
}) {
  const [modelUrl, setModelUrl] = useState("");

  const getModelUrl = async () => {
    const url = await createModelUrl(avatar.user_id, avatar.vrm);

    setModelUrl(url.signedUrl);

    console.log(avatar.name, url);
  };

  useEffect(() => {
    if (avatar) getModelUrl();
  }, [avatar]);

  return (
    <div className="flex flex-col">
      <div className="relative flex justify-center">
        <Image src={redHeartImg} className="absolute top-[-8px]" alt="" />
        <div className="flex justify-center items-center w-[209px] py-[10px] bg-[#FFFFFF] rounded-[200px] shadow-[0px_3px_10px_rgba(0,0,0,0.25)] text-[24px] font-SegoeUI font-semibold">
          {avatar ? Number(avatar.likes.length).toLocaleString() : "-"}
        </div>
      </div>
      <div className="relative flex flex-col items-center w-[340px] h-[425px] my-[20px]">
        {avatar && (
          <EventViewer
            modelUrl={modelUrl}
            animation={"Idle"}
            toolbarCss={"hidden"}
          />
        )}
      </div>
      <div className="relative flex items-center w-[340px] h-[64px]">
        <div className="absolute top-[23.5px] left-[2.5px] w-[58px] h-[36px] bg-[#C0A74B] rounded-[8px] rotate-[22.521deg]" />
        <div className="absolute right-0 flex justify-center items-center w-[311px] h-[64px] py-[bg-[#FFFFFF] bg-[#FFFFFF] rounded-[8px] shadow-[5px_5px_0px_rgba(84,87,167,1)] text-[24px] font-SegoeUI font-semibold z-10">
          {avatar ? avatar.name : "-"}
        </div>
        <div className="flex justify-center items-center w-[58px] h-[36px] bg-[#EDCB51] rounded-[8px] text-[20px] text-[#FFFFFF] font-SegoeUI font-semibold z-10">
          1
        </div>
      </div>
    </div>
  );
}
