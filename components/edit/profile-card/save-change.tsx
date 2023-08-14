"use client";
import React, { forwardRef } from "react";

const SaveChange = forwardRef(function SaveChange(props: any, ref: any) {
  const handleClick = () => {
    

    // const name = ref.current?.value;
    // console.log(name);
    // console.log("file", ref.current.files[0]);
  };

  return (
    <button
      className="flex justify-center items-center w-[60px] h-[47px] text-white bg-[#368ADC] rounded-[10px]"
      onClick={handleClick}
    >
      저장
    </button>
  );
});

export default SaveChange;
