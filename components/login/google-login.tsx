"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import googleLogo from "@/app/assets/logos/google.svg";
import { useSearchParams, useRouter } from "next/navigation";

export default function GoogleLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/")) as string;

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-white border-[1px] border-s2xyoon-gray cursor-pointer"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <Image
        className="w-[23px] h-[23px] ml-[19px] absolute left-0"
        src={googleLogo}
        alt=""
      />
      <p className="text-black">구글로 시작하기</p>
    </div>
  );
}
