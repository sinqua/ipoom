"use client";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import searchImg from "@/app/assets/images/search.svg";
import messageImg from "@/app/assets/images/message.svg";
import alertImg from "@/app/assets/images/alert.svg";
import profileImg from "@/app/assets/images/profile.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderAfterLogin() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="relative md:max-w-[1312px] w-full sm:h-[69px] h-[106px] flex justify-between sm:items-center items-start md:px-0 sm:px-[30px] px-[20px] py-[15px] bg-white font-sans font-sm text-[14px]">
      <a href="/" title="Go to homepage">
        <Image src={moopiLogo} className="w-auto sm:h-[40px] h-[30px]" alt="" />
      </a>
      <div className="h-[30px] flex flex-row items-center sm:space-x-[30px] space-x-[20px]">
        <div className="sm:relative absolute grow sm:w-auto w-full flex justify-end sm:top-0 bottom-[0] sm:px-0 px-[20px] left-0 md:text-right sm:text-center">
          <div className="flex items-center md:w-[450px] sm:w-[335px] w-full h-[40px] px-[25px] rounded-full bg-white border-solid border-[1px] border-[#CCCCCC]">
            <input
              type="text"
              className="grow h-full outline-none text-sm"
              placeholder="검색어를 입력해주세요"
            ></input>
            <Image
              src={searchImg}
              className="w-[20px] h-[20px] cursor-pointer"
              alt=""
            />
          </div>
        </div>

        <Image
          src={messageImg}
          className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
          alt=""
        />
        <Image
          src={alertImg}
          className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
          alt=""
        />
        <Image
          src={profileImg}
          className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
          alt=""
          onClick={() => setModal(!modal)}
        />
        {modal && (
          <div className="absolute top-[60px] right-0 w-[144px] rounded-[10px] bg-white border-solid border-[1px] border-[#ECECEC] overflow-hidden z-10">
            <Link
              href={`/${session!.user.id}/description`}
              className="flex items-center h-[43px] px-[15px] cursor-pointer"
              onClick={() => setModal(false)}
            >
              프로필
            </Link>
            <div className="w-full h-[1px] bg-[#ECECEC]"></div>
            <Link
              href={`/${session!.user.id}/edit/profile-card`}
              className="flex items-center h-[43px] px-[15px] cursor-pointer"
              onClick={() => setModal(false)}
            >
              프로필 수정
            </Link>
            <div className="w-full h-[1px] bg-[#ECECEC]"></div>
            <div
              className="flex items-center h-[43px] px-[15px] cursor-pointer"
              onClick={() => {
                signOut();
                setModal(false);
              }}
            >
              로그아웃
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
