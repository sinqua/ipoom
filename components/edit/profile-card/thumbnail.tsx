"use client";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import UploadImage from "@/components/edit/profile-card/upload-image";
import SaveChange from "@/components/edit/profile-card/save-change";

import emptyImg from "@/app/assets/images/empty.png";

export default function Thumbnail({ url }: { url: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState(url);

  return (
    <Card>
      <CardHeader title={"프로필 사진"}>
        최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.
        <br />
        타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로 변경할 수
        있습니다.
      </CardHeader>
      {/* <SaveChange ref={inputRef} /> */}
      <div className="flex items-center ph:space-x-[32px] space-x-[24px]">
        <Image
          src={fileUrl ? fileUrl : emptyImg}
          width={160}
          height={160}
          className="ph:h-[160px] h-[100px] ph:w-[160px] w-[100px] bg-gray-200 rounded-full border-none"
          alt=""
        />
        <div className="flex space-x-[110px]">
          <UploadImage handler={setFileUrl} ref={inputRef} />
          <SaveChange />
        </div>
      </div>
    </Card>
  );
}
