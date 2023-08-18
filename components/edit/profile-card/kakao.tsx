'use client'
import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import SaveChange from "./save-change";
import { useRef } from "react";

export default function Kakao({ link }: { link: any }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader title={"오픈카톡 링크"}>
        사용중인 오픈카톡 전체 링크를 입력해주세요.
        <br />
        {"예시) https://open.kakao.com/o/s7l8njtf"}
      </CardHeader>
      <div className="flex ph:w-auto w-full space-x-[16px]">
        <div className="flex items-center ph:w-[392px] w-auto ph:grow-0 grow h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
          <input
            type="text"
            ref={inputRef}
            className="grow h-full outline-none text-sm"
            placeholder="오픈카톡 링크를 입력해주세요."
            defaultValue={link ? link : ""}
          ></input>
        </div>
        <SaveChange label="kakao" ref={inputRef} />
      </div>
    </Card>
  );
}
