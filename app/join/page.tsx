"use client";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseAuth } from "@/lib/database";
import { supabase } from "@/lib/database";
import { useSession } from "next-auth/react";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = (searchParams.get("callbackUrl") ?? "/") as string;

  const { data: session, status, update } = useSession();

  const inputRef = useRef<any>(null);
  const [empty, setEmpty] = useState(true);
  const [duplication, setDuplication] = useState(false);

  const onChangeNickname = async (nickname: string) => {
    setEmpty(nickname.length === 0 ? true : false);

    const { data, error } = await supabaseAuth
      .from("users")
      .select()
      .eq("nickname", nickname);

    const result = data?.length === 0 ? false : true;
    setDuplication(result);
  };

  const onSubmit = async () => {
    if (status === "loading") return;

    if (duplication) {
      alert("이미 사용중인 닉네임입니다.");
      return;
    }

    const { data: userData, error: userError } = await supabaseAuth
      .from("users")
      .update({ nickname: inputRef.current.value })
      .eq("id", session?.user.id)
      .select()
      .limit(1)
      .single();

    await supabase
      .from("profiles")
      .insert([{ user_id: session?.user.id, image: userData.image }])
      .select();

    await supabase.from("user_details").insert([{ user_id: session?.user.id }]);

    await supabase.from("slots").insert([{ user_id: session?.user.id }]);

    await supabase.from("links").insert([{ user_id: session?.user.id }]);

    update();
    router.push(`/${session?.user.id}`);
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
          <div className="flex items-center w-full h-[47px] px-[25px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
            <input
              type="text"
              className="grow h-full outline-none text-sm"
              ref={inputRef}
              placeholder="사용하실 닉네임을 입력해주세요."
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeNickname(event.target.value);
              }}
            ></input>
          </div>
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
