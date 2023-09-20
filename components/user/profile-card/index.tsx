import Image from "next/image";
import kakaoLogo from "@/app/assets/logos/kakao.svg";
import twitterLogo from "@/app/assets/logos/twitter.svg";
import tossLogo from "@/app/assets/logos/toss.svg";

import MenuBar from "./menu-bar";
import Link from "next/link";
import emptyImg from "@/app/assets/images/empty.png";
import defaultBgImg from "@/public/default_background.png";
import followImg from "@/app/assets/images/follow_white.svg";
import checkImg from "@/app/assets/images/check_black.svg";
import userImg from "@/app/assets/images/user_white.svg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  getFollowStatus,
  getLink,
  getProfile,
} from "@/lib/supabase";
import ToastButton from "./toast-button";
import FollowButton from "./follow-button";

export default async function ProfileCard({ userId }: { userId: string }) {
  const session = await getServerSession(authOptions);

  const profileData = getProfile(userId);
  const linkData = getLink(userId);
  const followStatusData = session?.user.id
    ? getFollowStatus(session?.user.id, userId)
    : false;

  const [profile, link, followStatus] = await Promise.all([
    profileData,
    linkData,
    followStatusData,
  ]);

  return (
    <div className="flex flex-col shrink-0 ph:w-[360px] w-full h-fit ph:rounded-[8px] ph:shadow-[0px_3px_6px_rgba(0,0,0,0.16)] overflow-hidden">
      <Image
        src={profile.background ? profile.background : defaultBgImg}
        width={512}
        height={512}
        className="object-cover w-full h-[180px] bg-[#ECECEC]"
        alt=""
      />
      <div className="flex justify-center items-center w-full h-0 overflow-visible z-10">
        <div className="flex justify-center items-center w-[128px] h-[128px] bg-[#2778C7] rounded-full">
          <Image
            src={profile.image ? profile.image : emptyImg}
            width={512}
            height={512}
            className="object-cover w-[120px] h-[120px] rounded-full"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full ph:p-[24px] p-[16px] !pt-[80px] space-y-[24px] bg-[#FFFFFF]">
        <p className="text-[24px] font-bold text-center">{profile.nickname}</p>
        <div className="ph:flex hidden flex-col space-y-[40px]">
          <div className="flex flex-col space-y-[16px]">
            <p className="text-[16px] text-[#9D9D9D] font-semibold">소개</p>
            <p className="whitespace-pre-line leading-[24px]">
              {profile.description}
            </p>
          </div>
          <div className="flex flex-col space-y-[16px]">
            <p className="text-[16px] text-[#9D9D9D] font-semibold">태그</p>
            <div className="flex flex-wrap w-full">
              {profile.tags.map((item: any, index: any) => {
                return (
                  <div
                    className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap"
                    key={index}
                  >
                    {item.tag}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ph:hidden flex flex-wrap justify-center w-full">
          {profile.tags.map((item: any, index: any) => {
            return (
              <p
                className="px-[8px] py-[4px] mr-[16px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap"
                key={index}
              >
                {item.tag}
              </p>
            );
          })}
        </div>
        <div className="ph:block hidden w-full h-[1px] !mt-[8px] bg-[#D4D4D4]"></div>
        {/* <div className="flex justify-center w-full space-x-[24px]">
          <Link
            href={link.kakao ? link.kakao : ""}
            rel="noopener noreferrer"
            target="_blank"
            className={`${
              link.kakao ? "pointer-events-auto" : "pointer-events-none"
            } flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#FEE500] cursor-pointer`}
          >
            <Image
              src={kakaoLogo}
              className="w-[18px] h-[18px] rounded-full"
              alt=""
            />
          </Link>
          <Link
            href={link.twitter ? link.twitter : ""}
            rel="noopener noreferrer"
            target="_blank"
            className={`${
              link.twitter ? "pointer-events-auto" : "pointer-events-none"
            } flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#00ACEE] cursor-pointer`}
          >
            <Image
              src={twitterLogo}
              className="w-[18px] h-[18px] rounded-full"
              alt=""
            />
          </Link>
          <Link
            href={link.toss ? link.toss : ""}
            rel="noopener noreferrer"
            target="_blank"
            className={`${
              link.toss ? "pointer-events-auto" : "pointer-events-none"
            } flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#0064FF] cursor-pointer`}
          >
            <Image
              src={tossLogo}
              className="w-[18px] h-[18px] rounded-full"
              alt=""
            />
          </Link>
        </div> */}
        <div className="flex w-full space-x-[16px]">
          <FollowButton
            sessionId={session?.user.id}
            userId={userId}
            status={followStatus}
          />
          <ToastButton />
        </div>
        <MenuBar />
      </div>
    </div>
  );
}
