import Image from "next/image";
import Link from "next/link";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import offingLogo from "@/app/assets/logos/offing.svg";
import KakaoLogin from "@/components/login/KakaoLogin";
import TwitterLogin from "@/components/login/TwitterLogin";
import GoogleLogin from "@/components/login/GoogleLogin";
import DiscordLogin from "@/components/login/DiscordLogin";
import NaverLogin from "@/components/login/NaverLogin";
import loginBg from "@/public/LoginBackground.png";

export default function Page() {
  return (
    <div className="flex flex-row h-full font-sans text-[#333333]">
      <div className="dt:block hidden grow-0 w-[514px]">
        <Image
          className="object-cover w-full h-full"
          src={loginBg}
          alt=""
          loading="eager"
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-center grow space-y-[40px]">
        <Image
          className="w-auto h-[40px] mb-[30px]"
          src={moopiLogo}
          alt=""
          loading="eager"
        />
        <div className="flex flex-col w-[320px] space-y-[16px]">
          <p className="text-[36px] font-semibold">반갑습니다</p>
          <p className="text-[14px] text-[#9D9D9D]">로그인 방법을 선택하세요</p>
        </div>
        <div className="space-y-[18px] text-sm text-white">
          <KakaoLogin />
          <TwitterLogin />
          <GoogleLogin />
          <DiscordLogin />
          <NaverLogin />
        </div>
        <div className="w-[300px] text-[14px] text-[#9D9D9D] text-center leading-[30px]">
          계속 진행하면 moopi{" "}
          <span className="text-[#333333] underline underline-offset-2 cursor-pointer">
            서비스 약관
          </span>
          에 동의하고{" "}
          <span className="text-[#333333] underline underline-offset-2 cursor-pointer">
            개인정보 보호정책
          </span>
          을 읽었음을 인정하는 것으로 간주됩니다.
        </div>
      </div>
    </div>
  );
}
