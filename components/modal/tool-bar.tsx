"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";

interface ToolBarProps {
  captureMode: boolean;
  resetCamera: () => void;
  setHelpViewer: any;
}

export default function ToolBar({
  captureMode,
  resetCamera,
  setHelpViewer,
}: ToolBarProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const toogleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.getElementById("canvas")?.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  const fullscreenchanged = (e: any) => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  };

  useEffect(() => {
    document
      .getElementById("canvas")
      ?.addEventListener("fullscreenchange", fullscreenchanged);
  }, []);
  return (
    <motion.div
      className="absolute flex flex-row ph:top-[40px] bottom-[24px] ph:right-[40px] right-[24px] space-x-[16px] pointer-events-auto"
      animate={captureMode ? { opacity: 0 } : { opacity: 1 }}
    >
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={resetCamera}
      >
        <Image className="w-[20px] h-[20px]" src={refreshImg} alt="" />
      </div>
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setHelpViewer(true)}
      >
        <Image className="w-[20px] h-[20px]" src={helpImg} alt="" />
      </div>
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={toogleFullscreen}
      >
        <Image
          className="w-[20px] h-[20px]"
          src={fullscreen ? originalscreenImg : fullscreenImg}
          alt=""
        />
      </div>
    </motion.div>
  );
}
