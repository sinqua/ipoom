"use client";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function Page() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const inputRef = useRef<any>(null);
  const [empty, setEmpty] = useState(true);
  const [duplication, setDuplication] = useState(false);

  const onChangeNickname = async (nickname: string) => {
    setEmpty(nickname.length === 0 ? true : false);

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("nickname", nickname);

    const result = data?.length === 0 ? false : true;
    setDuplication(result);
  };

  const onSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (duplication) {
      alert("이미 사용중인 닉네임입니다.");
      return;
    }

    await supabase.from("profiles").insert([
      {
        user_id: user?.id,
        image: user?.user_metadata.avatar_url,
        nickname: inputRef.current.value,
      },
    ]);
    await supabase.from("user_details").insert([{ user_id: user?.id }]);
    await supabase.from("links").insert([{ user_id: user?.id }]);

    router.push(`/${user?.id}`);
  };

  return (
    <div className="flex flex-col items-center h-full pt-[80px] mx-[16px] space-y-[40px] text-[14px] font-sans">
      <Image className="w-[90px] h-[33px]" src={moopiLogo} alt="" />
      <div className="max-w-[584px] w-full ph:px-[48px] ph:py-[40px] p-[24px] space-y-[40px] border-solid border-[1px] border-[#E7E7E7] rounded-[10px]  shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
        <p className="text-[25px] font-bold leading-[40px]">
          회원님을 표현할 수 있는
          <br />
          닉네임을 입력해주세요!
        </p>
        <p className="leading-[25px]">
          타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수
          있습니다.
          <br />
          닉네임 변경은 마이페이지{">"}프로필 편집에서 2달에 1회 진행할 수
          있습니다.
        </p>
        <div className="space-y-[8px]">
          <input
            type="text"
            className="w-full h-[47px] px-[14px] text-sm rounded-[10px] bg-white border-[1px] border-[#CCCCCC] focus:border-[#CCCCCC] focus:ring-0"
            ref={inputRef}
            placeholder="사용하실 닉네임을 입력해주세요."
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChangeNickname(event.target.value);
            }}
          />
          <div className="h-[19px]">
            {empty ? (
              <></>
            ) : duplication ? (
              <p className="text-[#FF4848]">이미 사용중인 닉네임입니다.</p>
            ) : (
              <p className="text-[#5333FF]">사용 가능한 닉네임입니다.</p>
            )}
          </div>
        </div>

        <div
          className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#4995DF] text-white cursor-pointer"
          onClick={onSubmit}
        >
          계정 생성하기
        </div>
      </div>
    </div>
  );
}
