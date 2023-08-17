"use client";

import {
  getProfile,
  getUserProfileImage,
  getLink,
  getUser,
} from "@/lib/supabase";
import { useSession } from "next-auth/react";
import Header from "@/components/user/header";

import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import tempImg from "@/public/VerticalModel.png";

import kakaoLogo from "@/app/assets/logos/kakao.svg";
import twitterLogo from "@/app/assets/logos/twitter.svg";
import discordLogo from "@/app/assets/logos/discord.svg";
import Menu from "@/components/user/header/menu";
import Item from "@/components/user/header/menu-item";
import MenuBar from "@/components/user/profile/menu-bar";

export default async function Page({ params }: { params: { user: string } }) {
  console.log("params", params.user);

  // const profileData = getProfile(params.user);
  // const profileImageData = getUserProfileImage(params.user);
  // const linkData = getLink(params.user);
  // const userData = getUser(params.user);

  // const [user, profile, profileImage, link] = await Promise.all([
  //   userData,
  //   profileData,
  //   profileImageData,
  //   linkData,
  // ]);

  return (
    <div className="flex justify-center w-full grow dt:px-0 ph:px-[16px] ph:py-[40px]">
      <div className="relative flex ph:flex-row flex-col-reverse  dt:max-w-[1008px] w-full h-full dt:space-x-[64px] ph:space-x-[32px] space-x-0">
        <div className="grid ph:grid-cols-3 grid-cols-2 gap-[16px] grow h-fit ph:p-0 p-[16px] pb-[80px]">
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full dt:h-[240px] ph:h-[233px] rounded-[8px] overflow-hidden cursor-pointer">
            <Image src={tempImg} className="w-full h-full" alt="" />
            <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
              <div className="flex justify-between w-full">
                <p>C.At</p>
                <p>1주 전</p>
              </div>
              <div className="w-full">
                <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  #VRC&nbsp;&nbsp;#blender&nbsp;&nbsp;#이세계아이돌
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col shrink-0 ph:w-[360px] w-full h-fit ph:rounded-[8px] ph:shadow-[0px_3px_6px_rgba(0,0,0,0.16)] overflow-hidden">
          <div className="w-full h-[180px] bg-[#ECECEC]"></div>
          <div className="flex justify-center items-center w-full h-0 overflow-visible z-10">
            <div className="flex justify-center items-center w-[128px] h-[128px] bg-[#2778C7] rounded-full">
              <Image
                src={emptyImg}
                className="w-[120px] h-[120px] rounded-full"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full ph:p-[24px] p-[16px] pt-[80px] space-y-[24px] bg-[#FFFFFF]">
            <p className="text-[24px] font-bold text-center">ShinQua</p>
            <div className="ph:flex hidden flex-col space-y-[40px]">
              <div className="flex flex-col space-y-[16px]">
                <p className="text-[16px] text-[#9D9D9D] font-semibold">설명</p>
                <p className="leading-[24px]">
                  안녕하세요. 유튜브 [메소왕] 채널 운영하고 있는 ShinQua입니다.
                  <br />
                  유니티와 블렌더를 활용한 오리지널 캐릭터 제작을 하고 있습니다.
                  <br />
                  문의사항은 인스타그램 DM으로 부탁드립니다🙏
                </p>
              </div>
              <div className="flex flex-col space-y-[16px]">
                <p className="text-[16px] text-[#9D9D9D] font-semibold">태그</p>
                <div className="flex flex-wrap w-full">
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    VRC
                  </div>
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    blender
                  </div>
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    이세계아이돌
                  </div>
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    무요
                  </div>
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    모시깽이
                  </div>
                  <div className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap">
                    야스야스야스
                  </div>
                </div>
              </div>
            </div>
            <div className="ph:hidden flex flex-wrap justify-center w-full">
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">#VRC</p>
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">#blender</p>
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">
                #이세계아이돌
              </p>
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">#무요</p>
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">#모시깽이</p>
              <p className="mr-[16px] mb-[10px] whitespace-nowrap">
                #야스야스야스
              </p>
            </div>
            <div className="ph:block hidden w-full h-[1px] !mt-[8px] bg-[#D4D4D4]"></div>
            <div className="flex justify-center w-full space-x-[24px]">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#FEE500] cursor-pointer">
                <Image
                  src={kakaoLogo}
                  className="w-[18px] h-[18px] rounded-full"
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#00ACEE] cursor-pointer">
                <Image
                  src={twitterLogo}
                  className="w-[18px] h-[18px] rounded-full"
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-[#0064FF] cursor-pointer">
                <Image
                  src={discordLogo}
                  className="w-[18px] h-[18px] rounded-full"
                  alt=""
                />
              </div>
            </div>
            {/* <div className="w-full h-[32px]"> */}
              <MenuBar />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
