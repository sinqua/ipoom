import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import menuImg from "@/app/assets/images2/menu.svg";
import searchImg from "@/app/assets/images2/search.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-[#D4D4D4]">
      <div className="relative md:max-w-[1008px] w-full h-[65px] flex justify-end items-center md:px-0 px-[16px] bg-white font-sm text-[14px]">
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          <Image src={searchImg} className="w-[20px] h-[20px]" alt="" />
        </div>
      </div>
    </div>
  );
}
