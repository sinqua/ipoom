"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import cancelBlackImg from "@/app/assets/images/cancel_black.svg";
import cameraImg from "@/app/assets/images/camera.svg";
import playImg from "@/app/assets/images/play.svg";
import stopImg from "@/app/assets/images/stop.svg";

interface CameraProps {
  captureMode: boolean;
  takeCapture: any;
  setCaptureMode: (flag: boolean) => void;
}

export default function Camera({
  captureMode,
  takeCapture,
  setCaptureMode,
}: CameraProps) {
  return (
    <motion.div
      className="absolute flex flex-row justify-center bottom-[40px] w-full space-x-[32px] pointer-events-auto opacity-0"
      animate={captureMode ? { opacity: 1 } : { opacity: 0 }}
    >
      <div
        className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setCaptureMode(false)}
      >
        <Image className="w-[24px] h-[24px]" src={cancelBlackImg} alt="" />
      </div>
      <div
        className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#333333] hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={takeCapture}
      >
        <Image className="w-[26px] h-[26px]" src={cameraImg} alt="" />
      </div>
      <div
        className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
      >
        <Image
          className="w-[24px] h-[24px]"
          src={false ? stopImg : playImg}
          alt=""
        />
      </div>
    </motion.div>
  );
}
