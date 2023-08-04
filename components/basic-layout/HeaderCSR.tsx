import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";
import searchImg from "@/app/assets/images/search.svg";
import Link from "next/link";



export default function HeaderCSR({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative md:max-w-[1312px] w-full sm:h-[69px] h-[106px] flex justify-between sm:items-center items-start md:px-0 sm:px-[30px] px-[20px] py-[15px] bg-white font-sans font-sm text-[14px]">
      <Link href="/" title="Go to homepage">
        <Image src={moopiLogo} className="w-auto sm:h-[40px] h-[30px]" alt="" priority/>
      </Link>
      <div className="h-[30px] flex flex-row items-center">
        <div className="sm:relative absolute grow sm:w-auto w-full flex justify-end sm:top-0 bottom-[0] sm:px-0 px-[20px] left-0 md:text-right sm:text-center">
          <div className="flex items-center md:w-[450px] sm:w-[335px] w-full h-[40px] px-[25px] rounded-full bg-white border-solid border-[1px] border-[#CCCCCC]">
            <input
              type="text"
              className="grow h-full outline-none text-sm"
              placeholder="검색어를 입력해주세요"
            ></input>
            <Image
              src={searchImg}
              className="w-[20px] h-[20px] cursor-pointer"
              alt=""
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
