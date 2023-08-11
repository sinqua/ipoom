import Link from "next/link";
import Image from "next/image";
import homeImg from "@/app/assets/images2/home.svg";
import searchImg from "@/app/assets/images2/search.svg";
import messageImg from "@/app/assets/images2/message.svg";
import alarmImg from "@/app/assets/images2/alram.svg";
import followImg from "@/app/assets/images2/follow.svg";
import settingImg from "@/app/assets/images2/setting.svg";

export default function MenuList() {
    return (
        <div className="grow flex flex-col">
          <Link
            href={"/"}
            className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
          >
            <Image
              src={homeImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">홈</p>
          </Link>
          <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image
              src={searchImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">검색</p>
          </div>
          <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image
              src={messageImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">메시지</p>
          </div>
          <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image
              src={alarmImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">알림</p>
          </div>
          <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image
              src={followImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">팔로우</p>
          </div>
          <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image
              src={settingImg}
              className="w-[24px] h-[24px]"
              alt=""
              priority
            />
            <p className="text-[16px]">설정</p>
          </div>
        </div>
    )
}