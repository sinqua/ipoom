"use client";
import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import SaveChange from "./save-change";
import { useRef } from "react";

export default function Toss({ link }: { link: any }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader title={"토스아이디"}>
        형식에 맞지 않는 URL은 저장되지 않습니다.
        <br />
        {"예시) https://toss.me/macnoll"}
      </CardHeader>
      <div className="flex ph:w-auto w-full space-x-[16px]">
        <input
          type="text"
          ref={inputRef}
          className="ph:w-[392px] w-auto ph:grow-0 grow h-[47px] px-[20px] mb-[6px] text-sm bg-white rounded-[10px] border-[1px] border-[#CCCCCC] focus:border-[#CCCCCC] focus:ring-0"
          placeholder="토스아이디 URL을 입력해주세요."
          defaultValue={link ? link : ""}
        />
        <SaveChange label="toss" ref={inputRef} />
      </div>
    </Card>
  );
}
