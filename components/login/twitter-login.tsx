"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import twitterLogo from "@/app/assets/logos/twitter.svg";
import { useSearchParams, useRouter } from "next/navigation";

export default function TwitterLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/home")) as string;

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#00ACEE] cursor-pointer"
      onClick={() => signIn("twitter", { callbackUrl })}
    >
      <Image
        className="w-[22px] h-[22px] ml-[21px] absolute left-0"
        src={twitterLogo}
        alt=""
      />
      <p>트위터로 시작하기</p>
    </div>
  );
}
