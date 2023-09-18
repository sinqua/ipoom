import Image from "next/image";
import Link from "next/link";
import icon from "@/app/assets/images/add-thick-gray.svg";

export default function InputGuide() {
  return (
    <div className="relative w-auto dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden">
      <div className="relative w-full h-full cursor-pointer rounded-[8px] overflow-hidden bg-[#F6F6F6]">
        <Link
          href={`/upload`}
          className="flex flex-col justify-end items-center w-full h-full"
        >
          <Image
            src={icon}
            width={40}
            height={40}
            className="object-cover"
            alt=""
          />
          <p className="text-[16px] font-semibold text-[#9D9D9D] mt-[16px]">
            아바타 추가
          </p>
          <p className="text-[12px] text-[#9D9D9D] mt-[24px] m-[16px]">* 업로드에 사용할 아바타 파일을 미리 준비하세요.</p>
        </Link>
      </div>
    </div>
  );
}
