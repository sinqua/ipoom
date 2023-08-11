import Link from "next/link";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profile";
import Button from "./button";
import Menu from "./menu";
import Item from "./menu-item";

import homeImg from "@/app/assets/images2/home.svg";
import searchImg from "@/app/assets/images2/search.svg";
import messageImg from "@/app/assets/images2/message.svg";
import alarmImg from "@/app/assets/images2/alram.svg";
import followImg from "@/app/assets/images2/follow.svg";
import settingImg from "@/app/assets/images2/setting.svg";

export default function Navbar() {
  return (
    <div className="dt:relative absolute dt:w-[280px] w-auto">
      <div className="block flex-none dt:hidden">
        <MobileNavbar />
      </div>
      <div className="fixed dt:flex hidden flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20 text-[#333333]">
        <div className="px-[32px] py-[24px]">
          <Link href="/" title="Go to homepage">
            <Image
              src={moopiLogo}
              className="w-auto ph:h-[40px] h-[30px]"
              alt=""
              priority
            />
          </Link>
        </div>
        <Menu>
          <Item imgSrc={homeImg}>홈</Item>
          <Item imgSrc={searchImg}>검색</Item>
          <Item imgSrc={messageImg}>메시지</Item>
          <Item imgSrc={alarmImg}>알림</Item>
          <Item imgSrc={followImg}>팔로우</Item>
          <Item imgSrc={settingImg}>설정</Item>
        </Menu>
        <Button />
        <Profile />
      </div>
    </div>
  );
}
