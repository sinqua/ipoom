"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";

import cancelImg from "@/app/assets/images/cancel.svg";
import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";

import cancelBlackImg from "@/app/assets/images/cancel_black.svg";
import cameraImg from "@/app/assets/images/camera.svg";
import playImg from "@/app/assets/images/play.svg";
import stopImg from "@/app/assets/images/stop.svg";

import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";

import { ModelProps } from "@/components/modal/upload-model";
import BounceLoader from "react-spinners/BounceLoader";
import { motion } from "framer-motion";

const ModelComponent = lazy(() => import("./upload-model"));

interface ModalCanvasProps {
  canvasRef: any;
  modelUrl: string | null;
  animation: any;
  setAnimation: any;
  captureMode: any;
  setCaptureMode: any;
  takeCapture: any;
}

const ModalCanvas = ({
  canvasRef,
  modelUrl,
  animation,
  setAnimation,
  captureMode,
  setCaptureMode,
  takeCapture,
}: ModalCanvasProps) => {
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [fullScreen, setFullScreen] = useState(false);
  const [playStatus, setPlayStauts] = useState(false);
  const [helpViewer, setHelpViewer] = useState(false);
  const [progress, setProgress] = useState(false);

  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    setModelInfo({
      modelUrl: modelUrl,
      animation: animation,
      setAnimation: setAnimation,
      setProgress,
    });

    console.log("animation", animation);

  }, [modelUrl, animation]);

  const isMobile = () => "ontouchstart" in document.documentElement;

  // Prevent the default right-click behavior
  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);
    cameraControlsRef.current!.polarAngle = 1.35;
  };

  const postMessage = () => {
    if (!document.fullscreenElement) {
      document.getElementById("canvas")?.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  const fullscreenchanged = (e: any) => {
    if (document.fullscreenElement) {
      setFullScreen(true);
    } else {
      setFullScreen(false);
    }
  };

  useEffect(() => {
    document
      .getElementById("canvas")
      ?.addEventListener("fullscreenchange", fullscreenchanged);
  }, []);

  return (
    <div
      id="canvas"
      className="ph:absolute relative w-full h-full"
      onContextMenu={handleContextMenu}
    >
      {helpViewer && HelpViewer(setHelpViewer, isMobile)}
      <Suspense fallback={null}>
        <Canvas
          ref={canvasRef}
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 1.1] }}
          style={{ backgroundColor: "#FAF9F6" }}
          shadows
        >
          <CameraControls
            ref={cameraControlsRef}
            maxDistance={5}
            polarAngle={1.35}
          />
          <directionalLight position={[0, 1, 0]} castShadow />
          {modelInfo && <ModelComponent {...modelInfo!} />}
        </Canvas>
      </Suspense>
      {!progress && (
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
          <BounceLoader color="#2778C7" />
        </div>
      )}
      <div className="absolute flex justify-center top-0 w-full h-full pointer-events-none z-10">
        <motion.div
          className="absolute w-full h-full top-0 right-0"
          animate={captureMode ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="absolute flex justify-evenly w-full h-full">
            <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
            <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
          </div>
          <div className="absolute flex flex-col justify-evenly w-full h-full">
            <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
            <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
          </div>
        </motion.div>

        {MenuButton(
          captureMode,
          resetCamera,
          setHelpViewer,
          postMessage,
          fullScreen
        )}
        {CaptureButton(
          captureMode,
          takeCapture,
          setCaptureMode,
          setHelpViewer,
          postMessage,
          playStatus
        )}
      </div>
    </div>
  );
};

export default ModalCanvas;

function MenuButton(
  captureMode: boolean,
  resetCamera: () => void,
  setHelpViewer: any,
  postMessage: () => void,
  fullScreen: boolean
) {
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
        onClick={postMessage}
      >
        <Image
          className="w-[20px] h-[20px]"
          src={fullScreen ? originalscreenImg : fullscreenImg}
          alt=""
        />
      </div>
    </motion.div>
  );
}

function CaptureButton(
  captureMode: boolean,
  takeCapture: any,
  setCaptureMode: (flag: boolean) => void,
  setHelpViewer: any,
  postMessage: () => void,
  playStatus: boolean
) {
  return (
    <motion.div
      className="absolute flex flex-row justify-center bottom-[40px] w-full space-x-[32px] pointer-events-auto"
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
        onClick={postMessage}
      >
        <Image
          className="w-[24px] h-[24px]"
          src={!playStatus ? stopImg : playImg}
          alt=""
        />
      </div>
    </motion.div>
  );
}

function HelpViewer(setHelpViewer: any, isMobile: () => boolean) {
  return (
    <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 select-none bg-[#00000080] z-[999]">
      <Image
        className="absolute top-[20px] right-[20px] w-[28px] h-[28px] cursor-pointer"
        src={cancelImg}
        alt=""
        onClick={() => setHelpViewer(false)}
      />
      <div className="flex mc_sm:flex-row flex-col mc_sm:space-x-[60px] space-x-0 mc_sm:space-y-0 space-y-[16px] text-white text-center">
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={rotateImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">회전</p>
          {isMobile() ? (
            <p className="text-[14px]">한 손가락으로 드래그</p>
          ) : (
            <p className="text-[14px]">마우스 좌클릭 후 드래그</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={zoomImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">확대</p>
          {isMobile() ? (
            <p className="text-[14px]">
              두 손가락을 동시에
              <br />
              바깥/안쪽으로 드래그
            </p>
          ) : (
            <p className="text-[14px]">마우스 스크롤</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="mc_sm:w-[80px] w-[50px] mc_sm:h-[80px] h-[50px] mb-[20px] pointer-events-none"
            src={moveImg}
            alt=""
          />
          <p className="text-[18px] font-semibold mb-[10px]">이동</p>
          {isMobile() ? (
            <p className="text-[14px]">두 손가락으로 드래그</p>
          ) : (
            <p className="text-[14px]">마우스 우클릭 후 드래그</p>
          )}
        </div>
      </div>
    </div>
  );
}
