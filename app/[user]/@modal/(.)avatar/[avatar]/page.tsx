'use client'
import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";

import Image from "next/image";
import cancelImg from "@/app/assets/images/cancel.svg";
import { useRouter } from "next/navigation";

import ModalCanvas from "@/components/ModalCanvas";
import { createModelUrl, getAvatar } from "@/lib/supabase";


export default async function Avatar(props: any) {
  const { params } = props;
  const router = useRouter();

  // const avatarData = getAvatar(params.avatar);
  const avatarData = getAvatar("65");

  const [
    avatar,
  ] = await Promise.all([
    avatarData,
  ]);

  // const modelUrl = await createModelUrl(params.user, avatar?.vrm);
  const modelUrl = await createModelUrl("6064c1dd-071b-42e4-92e4-d0989aed4ebc", avatar?.vrm);

  return (
    <div className="fixed inset-0 flex justify-center w-full h-full pt-[80px] bg-[#00000050] z-50">
      <div className="relative w-full max-w-[1288px] h-full bg-gray-300 rounded-t-[10px]">
        <Image
          className="absolute right-0 top-[-44px] w-[20px] h-[20px] cursor-pointer"
          src={cancelImg}
          alt=""
          loading="eager"
          priority
          onClick={() => router.back()}
        />
        <div className="w-full h-full flex rounded-t-[10px] overflow-hidden">
          {/* <div className="grow bg-green-200"></div> */}
          <ModalCanvas
            modelUrl={modelUrl?.signedUrl}
            animation={avatar.animation}
          />
          <div className="flex flex-col w-[352px] h-full p-[24px] bg-[#FFFFFF]">
            <p className="text-[24px] font-semibold">{avatar.name}</p>
            <div className="flex flex-col space-y-[40px]">
              <div className="flex flex-col space-y-[16px]">
                <p className="font-semibold text-[#9D9D9D]">업로드</p>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

