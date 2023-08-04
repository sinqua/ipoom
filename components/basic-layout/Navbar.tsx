import Link from "next/link";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import homeImg from "@/app/assets/images2/home.svg";
import searchImg from "@/app/assets/images2/search.svg";
import messageImg from "@/app/assets/images2/message.svg";
import alarmImg from "@/app/assets/images2/alram.svg";
import followImg from "@/app/assets/images2/follow.svg";
import settingImg from "@/app/assets/images2/setting.svg";
import uploadImg from "@/app/assets/images2/upload.svg";
import moreImg from "@/app/assets/images2/more.svg";

import faceImg from "@/app/assets/images/face.png";

interface NavBarProps {
  isActiveNavbar: any;
  setIsActiveNavbar: any;
}

export default function Navbar(props: NavBarProps) {
  const { isActiveNavbar, setIsActiveNavbar } = props;

  return (
    <div className="md:relative absolute flex md:w-auto w-full md:h-auto h-full">
      <div className={`${isActiveNavbar ? "flex" : "md:flex hidden"} md:relative fixed flex-col w-[280px] h-full bg-white border-r-[1px] border-[#D4D4D4] z-20`}>
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
        <div className="grow flex flex-col">
          <Link href={"/"} className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image src={homeImg} className="w-[24px] h-[24px]" alt="" priority />
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
            <Image src={alarmImg} className="w-[24px] h-[24px]" alt="" priority />
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
        <div className="px-[32px] py-[24px]">
          <div className="flex justify-center items-center w-full h-[46px] rounded-[10px] bg-[#368ADC] hover:bg-[#5EA1E3] text-white cursor-pointer">
            <div className="flex items-center space-x-[16px]">
              <Image
                src={uploadImg}
                className="w-[24px] h-[24px]"
                alt=""
                priority
              />
              <p className="text-[16px]">업로드</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-[88px] space-x-[44px] border-t-[1px]">
          <div className="flex items-center space-x-[16px]">
            <Image
              src={faceImg}
              className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
              alt=""
              priority
            />
            <p className="text-[16px] text-[#637381]">Imoruk1031</p>
          </div>
          <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
            <Image src={moreImg} className="w-[20px] h-[20px]" alt="" />
          </div>
        </div>
      </div>
      <div className={`${isActiveNavbar ? "md:hidden block" : "hidden"} grow bg-[#00000050] z-10`} onClick={() => setIsActiveNavbar(false)}></div>
    </div>
  );
}
