"use client";

import Image from "next/image";
import { lazy, useEffect, useRef, useState, FC, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";

import cancelImg from "@/app/assets/images/cancel.svg";
import rotateImg from "@/app/assets/images/rotate.svg";
import zoomImg from "@/app/assets/images/zoom.svg";
import moveImg from "@/app/assets/images/move.svg";

import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";

import { ModelProps } from "@/components/modal/avatar-model";
import BounceLoader from "react-spinners/BounceLoader";

const ModelComponent = lazy(() => import("./avatar-model"));

interface ModalCanvasProps {
  modelUrl: string | undefined;
  animation: number | null;
}

const ModalCanvas = ({ modelUrl, animation }: ModalCanvasProps) => {
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [fullScreen, setFullScreen] = useState(false);
  const [progress, setProgress] = useState(false);

  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    setModelInfo({
      modelUrl: modelUrl,
      animation: animation,
      setProgress,
    });
  }, [modelUrl, animation]);

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
  }

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
      <Suspense fallback={null}>
        <Canvas
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
        <div className="absolute top-0 flex justify-end sm:items-start items-end max-w-[1312px] w-full h-full md:px-0 sm:px-[30px] px-[20px]">
          {MenuButton(resetCamera, postMessage, fullScreen)}
        </div>
      </div>
    </div>
  );
};

export default ModalCanvas;

function MenuButton(
  resetCamera: () => void,
  postMessage: () => void,
  fullScreen: boolean
) {
  return (
    <div className="absolute flex flex-row bottom-[40px] right-[40px] space-x-[16px] pointer-events-auto">
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={resetCamera}
      >
        <Image className="w-[20px] h-[20px]" src={refreshImg} alt="" />
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
    </div>
  );
}