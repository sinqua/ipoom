import Link from "next/link";
import Image from "next/image";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profile";
import MenuList from "./menu-list";
import UploadWork from "./upload-work";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <div className="dt:relative absolute dt:w-[280px] w-auto z-50">
      <div className="block flex-none dt:hidden">
        <Suspense fallback={<></>}>
          <MobileNavbar>
            <MenuList />
            <UploadWork />
            <Profile />
          </MobileNavbar>
        </Suspense>
      </div>
      <div className="fixed dt:flex hidden flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20 text-[#333333]">
        <div className="px-[32px] py-[24px]">
          <Link href="/home" title="Go to homepage">
            <div>
              <Image
                src={moopiLogo}
                className="w-auto ph:h-[40px] h-[30px]"
                alt=""
                priority
              />
            </div>
          </Link>
        </div>
        <MenuList />
        <UploadWork />
        <Profile />
      </div>
    </div>
  );
}
