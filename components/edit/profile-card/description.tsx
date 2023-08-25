"use client";
import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { validateNickname } from "@/lib/supabase";
import SaveChange from "./save-change";

export default function Description({ description }: { description: any }) {
  const { data: session, status } = useSession();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Card>
      <CardHeader title={"자기소개"}>
        매력적인 문구로 회원님을 소개해주세요.
      </CardHeader>
      <div className="flex ph:w-auto w-full space-x-[16px]">
        <textarea
          ref={inputRef}
          className="flex items-center ph:w-[392px] w-auto h-[200px] ph:grow-0 grow p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
          placeholder="자기소개를 입력해주세요."
          defaultValue={description}
        />
        <SaveChange label="description" ref={inputRef} />
      </div>
    </Card>
  );
}
