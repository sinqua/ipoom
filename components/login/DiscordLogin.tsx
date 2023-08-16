"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import discordLogo from "@/app/assets/logos/discord.svg";
import { useSearchParams, useRouter } from "next/navigation";

export default function DiscordLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = ("/verify?callbackUrl=" +
    (searchParams.get("callbackUrl") ?? "/")) as string;

  return (
    <div
      className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#5865F2] cursor-pointer"
      onClick={() => signIn("discord", { callbackUrl })}
    >
      <Image
        className="w-[24px] h-[24px] ml-[20px] absolute left-0"
        src={discordLogo}
        alt=""
      />
      <p>디스코드로 시작하기</p>
    </div>
  );
}
