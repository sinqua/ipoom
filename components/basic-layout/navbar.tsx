"use client";
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";

import MenuList from "./menu-list";
import UploadWork from "./upload-work";
import MiniProfile from "./mini-profile";

export default function Navbar() {
  const [isActiveNavbar, setIsActiveNavbar] = useState(false);

  return (
    <>
      <div
        className={`${
          isActiveNavbar ? "flex" : "dt:flex hidden"
        } dt:relative fixed flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20 text-[#333333]`}
      >
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
        <MenuList />
        <UploadWork />
        <MiniProfile />
      </div>
      <div
        className={`${
          isActiveNavbar ? "dt:hidden block" : "hidden"
        } grow bg-[#00000050] z-10`}
        onClick={() => setIsActiveNavbar(false)}
      ></div>
      <div
        className="absolute top-[12px] left-[16px] dt:hidden flex justify-center items-center w-[40px] h-[40px] rounded-full bg-transparent cursor-pointer z-30"
        onClick={() => setIsActiveNavbar(true)}
      ></div>
    </>
  );
}
