"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import loginImg from "@/app/assets/images/login.svg";


export default function LoginButton() {
  const pathname = usePathname();

  return (
    <div className="relative flex justify-between items-center h-[88px] space-x-[44px] px-[32px] pr-[24px] border-t-[1px]">
      <Link
        href={`/login?callbackUrl=${pathname}`}
        className="flex items-center space-x-[16px] cursor-pointer"
      >
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-solid border-[1px] border-[#D4D4D4] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
          <Image
            src={loginImg}
            className="w-[24px] h-[24px]"
            width={24}
            height={24}
            alt=""
            priority
          />
        </div>
        <p className="text-[16px] text-[#637381]">로그인</p>
      </Link>
    </div>
  );
}
