"use client";
import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import { useRef, useState } from "react";
import SaveChange from "./save-change";

export default function Description({ description }: { description: any }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Card>
      <CardHeader title={"소개"}>
      </CardHeader>
      <div className="flex ph:w-auto w-full space-x-[16px]">
        <textarea
          ref={inputRef}
          className="flex items-center ph:w-[392px] w-auto h-[200px] ph:grow-0 grow p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
          placeholder="소개를 입력해주세요."
          defaultValue={description}
        />
        <SaveChange label="description" ref={inputRef} />
      </div>
    </Card>
  );
}
