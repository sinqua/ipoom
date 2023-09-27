import Image from "next/image";
import searchImg from "@/app/assets/images/search.svg";

export default function Header() {
  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex justify-center w-full dt:h-[80px] h-[65px]">
        <div className="fixed top-0 left-0 w-full dt:h-[80px] h-[65px] bg-[#FFFFFF80] border-b-[1px] border-[#D4D4D4] z-10" />
        <div className="fixed top-0 flex tb:justify-center justify-end items-center dt:max-w-[1008px] w-full dt:h-[80px] h-[65px] tb:px-0 px-[16px] bg-[#FFFFFF80] border-b-[1px] border-[#D4D4D4] z-20">
          <div className="flex justify-center items-center w-fit h-fit p-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer">
            <div className="flex tb:justify-between justify-center items-center tb:w-[550px] w-[30px] tb:h-fit h-[30px] tb:px-[16px] px-0 tb:py-[8px] py-0 bg-[#FFFFFF] rounded-full">
              <p className="tb:block hidden text-[#CCCCCC]">
                아바타, 닉네임, 태그를 검색해보세요
              </p>
              <Image
                draggable={false}
                src={searchImg}
                className="w-[16px] h-[16px]"
                width={512}
                height={512}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
