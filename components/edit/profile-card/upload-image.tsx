"use client";
import React, { useRef } from "react";

export default function UploadImage() {
  const imgRef = useRef<any>();
  
  return (
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
  );
}
