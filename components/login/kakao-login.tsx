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

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const signInWithKakao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${getURL()}/auth/callback?urlTo=${callbackUrl}`,
      },
    });

    // if enabled, this will refresh the page at ios so gives bug
    // router.refresh();
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
