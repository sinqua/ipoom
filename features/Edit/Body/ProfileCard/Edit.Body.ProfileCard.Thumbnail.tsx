'use client';
import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import { useRef } from "react";

export default function Thumbnail() {
  const imgRef = useRef<any>();

  return (
    <div className="flex items-center sm:space-x-[32px] space-x-[24px]">
      <Image
        src={emptyImg}
        width={160}
        height={160}
        className="sm:h-[160px] h-[100px] sm:w-[160px] w-[100px] bg-gray-200 rounded-full border-none"
        alt=""
      />
      <form>
        <label
          className="flex justify-center items-center px-[16px] py-[11px] rounded-[10px] bg-[#368ADC] text-white cursor-pointer"
          htmlFor="profileImg"
        >
          프로필 변경
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="profileImg"
          // onChange={loadImgFile}
          ref={imgRef}
        />
      </form>
    </div>
  );
}
