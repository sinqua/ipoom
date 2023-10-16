"use client";
import Image from "next/image";
// import { signIn } from "next-auth/react";
import kakaoLogo from "@/app/assets/logos/kakao.svg";
import { useSearchParams, useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/database.types";

export default function KakaoLogin() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();
  const callbackUrl = ("verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/")) as string;

  const signInWithKakao = async () => {
    console.log("location", location)
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${location.origin}/auth/callback?urlTo=${callbackUrl}`,
      },
    });

    router.refresh();
  };

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#FEE500] cursor-pointer"
      onClick={() => signInWithKakao()}
    >
      <Image
        className="w-[22px] h-[22px] ml-[21px] absolute left-0"
        src={kakaoLogo}
        alt=""
      />
      <p className="text-black">카카오로 시작하기</p>
    </div>
  );
}
