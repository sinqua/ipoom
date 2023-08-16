"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import kakaoLogo from "@/app/assets/logos/kakao.svg";
import { useSearchParams, useRouter } from 'next/navigation';


export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/")) as string;

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#FEE500] cursor-pointer"
      onClick={() => signIn("kakao", { callbackUrl })}
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
