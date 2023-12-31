import Image from "next/image";
import searchImg from "@/app/assets/images/search.svg";

export default function Header() {
  return (
    <div className="flex justify-center w-full border-b-[1px] border-[#D4D4D4]">
      <div className="relative dt:max-w-[1008px] w-full h-[65px] flex justify-end items-center dt:px-0 px-[16px] bg-white font-sm text-[14px]">
        <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          <Image src={searchImg} className="w-[20px] h-[20px]" alt="" />
        </div>
      </div>
    </div>
  );
}
