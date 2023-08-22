import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Link from "next/link";
import Image from "next/image";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profile";
import MenuList from "./menu-list";
import UploadWork from "./upload-work";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="dt:relative absolute dt:w-[280px] w-auto">
      <div className="block flex-none dt:hidden">
        <MobileNavbar>
          <MenuList />
          {session && <UploadWork />}
          <Profile />
        </MobileNavbar>
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
        <MenuList />
        {session && <UploadWork />}
        <Profile />
      </div>
    </div>
  );
}
