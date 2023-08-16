"use client";
import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { validateNickname } from "@/lib/supabase";
import SaveChange from "./save-change";

export default function Nickname({ name }: { name: string }) {
  const { data: session, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);

  const [empty, setEmpty] = useState(true);
  const [duplication, setDuplication] = useState(false);

  console.log("session", session);

  // 닉네임 중복 확인
  const onChangeNickname = async (nickname: string) => {
    setEmpty(nickname.length === 0 ? true : false);

    if (nickname === session?.user.nickname) {
      setDuplication(false);
    } else {
      const result = await validateNickname(nickname);
      setDuplication(result);
    }
  };

  return (
    <Card>
      <CardHeader title={"닉네임"}>
        타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수
        있습니다.
        <br />
        닉네임 변경은 2달에 1회 진행할 수 있습니다.
      </CardHeader>
      <div className="flex space-x-[17px]">
        <div className="flex items-center ph:w-[392px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
          <input
            type="text"
            ref={inputRef}
            className="grow h-full outline-none text-sm"
            placeholder="닉네임을 입력해주세요."
            defaultValue={name ? name : ""}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChangeNickname(event.target.value);
            }}
          ></input>
        </div>
        <SaveChange label="nickname" ref={inputRef} />
      </div>
      {empty ? (
        <></>
      ) : duplication ? (
        <p className="text-[14px] text-[#FF4848]">
          이미 사용중인 닉네임입니다.
        </p>
      ) : (
        <p className="text-[14px] text-[#5333FF]">사용 가능한 닉네임입니다.</p>
      )}
    </Card>
  );
}
