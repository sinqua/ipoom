"use client";
import React, { forwardRef, useRef } from "react";

const UploadImage = forwardRef(function UploadImage(props: any, ref: any) {
  const loadImgFile = () => {
    const file = ref.current.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      props.handler(reader.result);
    };
  };

  return (
    <form>
      <label
        className="flex justify-center items-center h-[47px] px-[16px] rounded-[10px] bg-[#368ADC] text-white cursor-pointer"
        htmlFor={props.label}
      >
        이미지 변경
      </label>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        id={props.label}
        onChange={loadImgFile}
        ref={ref}
      />
    </form>
  );
});

export default UploadImage;
