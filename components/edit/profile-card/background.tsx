"use client";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import UploadImage from "@/components/edit/profile-card/upload-image";
import SaveChange from "@/components/edit/profile-card/save-change";

import defaultImg from "@/public/default_background.png";

export default function Background({ url }: { url: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState(url);

  return (
    <Card>
      <CardHeader title={"배경 사진"}>
        최소 360 x 180 크기의 JPEG 또는 PNG 파일이 필요합니다.
      </CardHeader>
      <div className="flex items-center ph:space-x-[32px] space-x-[24px]">
        <Image
          src={fileUrl ? fileUrl : defaultImg}
          width={160}
          height={160}
          className="object-cover ph:h-[160px] h-[100px] ph:w-[160px] w-[100px] bg-gray-200 rounded-[8px] border-none"
          alt=""
        />
        <div className="flex ph:w-[276px] justify-between ph:grow-0 grow ">
          <UploadImage handler={setFileUrl} label="background" ref={inputRef} />
          <SaveChange label="background" ref={inputRef} />
        </div>
      </div>
    </Card>
  );
}
