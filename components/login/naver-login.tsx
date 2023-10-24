"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import naverLogo from "@/app/assets/logos/naver.svg";
import { useSearchParams, useRouter } from "next/navigation";

export default function NaverLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/home")) as string;

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#03C75A] cursor-pointer"
      onClick={() => signIn("naver", { callbackUrl })}
    >
      <Image
        className="w-[19px] h-[19px] ml-[22px] absolute left-0"
        src={naverLogo}
        alt=""
      />
      <p>네이버로 시작하기</p>
    </div>
  );
}
