"use client";
import Image from "next/image";
import cancelImg from "@/app/assets/images/cancel.svg";
import { useRouter } from "next/navigation";

export default function Background() {
  const router = useRouter();

  return (
    <div
      className="absolute flex justify-center top-0 w-full h-full bg-[#00000085]"
      onClick={() => router.back()}
    >
      <div className="relative w-full dt:max-w-[1288px] max-w-none h-full">
      <Image
        className="absolute dt:right-0 right-[16px] top-[44px] w-[20px] h-[20px] cursor-pointer"
        src={cancelImg}
        alt=""
        loading="eager"
        priority
      />
      </div>
    </div>
  );
}
