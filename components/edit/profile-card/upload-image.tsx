"use client";
import React, { forwardRef, useRef } from "react";


/* 테스트를 위해서 폼을 2개 만들었어요 -> 완성되면 1개만 있어요*/
const UploadImage = forwardRef(function UploadImage(props, ref: any) {
  return (
    <>
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
          ref={ref}
        />
      </form>
      <form>
        <label>test</label>
        <input type="text" ref={ref} title="text" />
      </form>
    </>
  );
});

export default UploadImage;
