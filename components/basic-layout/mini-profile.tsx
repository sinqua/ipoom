import Image from "next/image";

import moreImg from "@/app/assets/images2/more.svg";
import faceImg from "@/app/assets/images/face.png";

export default function MiniProfile() {
  return (
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
  );
}
