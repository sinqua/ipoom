"use client";
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import Profile from "./Navbar.Profile";
import Button from "./Navbar.Button";
import Menu from "./Navbar.Menu";
import Item from "./Navbar.Menu.Item";

import homeImg from "@/app/assets/images2/home.svg";
import searchImg from "@/app/assets/images2/search.svg";
import messageImg from "@/app/assets/images2/message.svg";
import alarmImg from "@/app/assets/images2/alram.svg";
import followImg from "@/app/assets/images2/follow.svg";
import settingImg from "@/app/assets/images2/setting.svg";

export default function Navbar() {
  const [isActiveNavbar, setIsActiveNavbar] = useState(false);

  return (
    <>
      <div
        className={`${
          isActiveNavbar ? "flex" : "md:flex hidden"
        } md:relative fixed flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20 text-[#333333]`}
      >
        <div className="px-[32px] py-[24px]">
          <Link href="/" title="Go to homepage">
            <Image
              src={moopiLogo}
              className="w-auto sm:h-[40px] h-[30px]"
              alt=""
              priority
            />
          </Link>
        </div>
        <Menu>
          <Item icon={homeImg} title={"홈"} />
          <Item icon={searchImg} title={"검색"} />
          <Item icon={messageImg} title={"메시지"} />
          <Item icon={alarmImg} title={"알림"} />
          <Item icon={followImg} title={"팔로우"} />
          <Item icon={settingImg} title={"설정"} />
        </Menu>
        <Button />
        <Profile />
      </div>
      <div
        className={`${
          isActiveNavbar ? "md:hidden block" : "hidden"
        } grow bg-[#00000050] z-10`}
        onClick={() => setIsActiveNavbar(false)}
      ></div>
      <div
        className="absolute top-[12px] left-[16px] md:hidden flex justify-center items-center w-[40px] h-[40px] rounded-full bg-transparent cursor-pointer z-30"
        onClick={() => setIsActiveNavbar(true)}
      ></div>
    </>
  );
}
