import Image from "next/image";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import moopiWhiteLogo from "@/app/assets/logos/moopi_white.svg";
import KakaoLogin from "@/components/login/kakao-login";
import TwitterLogin from "@/components/login/twitter-login";
import GoogleLogin from "@/components/login/google-login";
import DiscordLogin from "@/components/login/discord-login";
import NaverLogin from "@/components/login/naver-login";
import loginBg from "@/public/LoginBackground.png";
import { Metadata } from "next";

import Redirect from "@/components/login/redirect";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `무피 - 로그인`,
    openGraph: {
      title: `무피 - 로그인`,
      description: `무피 로그인 페이지입니다.`,
    },
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return <Redirect />;

  return (
    <div className="flex flex-row h-full font-sans text-[#333333]">
      <div className="relative dt:block hidden grow-0 w-[514px]">
        <Image
          className="object-cover w-full h-full"
          src={loginBg}
          alt=""
          loading="eager"
          priority
        />
        <Image
          className="absolute top-[24px] left-[24px] w-auto h-[40px]"
          src={moopiWhiteLogo}
          alt=""
          loading="eager"
          priority
        />
        <p className="absolute bottom-[24px] left-[24px] text-[16px] text-[#FFFFFF]">
          Kyul by kuromi
        </p>
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
