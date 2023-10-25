"use client";

import { lazy, useEffect, useRef, useState, FC, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";
import { isMobile } from "react-device-detect";

import { ModelProps } from "@/components/modal/model";
import BounceLoader from "react-spinners/BounceLoader";

import ToolBar from "./tool-bar";
import HelperScreen from "./helper-screen";

const ModelComponent = lazy(() => import("./model"));

interface ViewerProps {
  modelUrl: string | null;
  animation: string | undefined;
  canvasRef?: any;
  captureMode?: any;
  status?: any;
  toolbarCss: any;
  children?: React.ReactNode;
}

export default function Viewer({
  modelUrl,
  animation,
  canvasRef,
  captureMode,
  status,
  toolbarCss,
  children,
}: ViewerProps) {
  const [modelInfo, setModelInfo] = useState<ModelProps>();
  const [helpViewer, setHelpViewer] = useState(false);
  const [progress, setProgress] = useState(status);

  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    setModelInfo({
      modelUrl: modelUrl!,
      animation: animation!,
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

  return (
    <div
      id="canvas"
      className="ph:absolute relative w-full h-full bg-[#FAF9F6]"
      onContextMenu={handleContextMenu}
    >
      {helpViewer && (
        <HelperScreen setHelpViewer={setHelpViewer} isMobile={isMobile} />
      )}
      <Suspense fallback={null}>
        <Canvas
          ref={canvasRef}
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 3, 1.1], fov: 25 }}
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
      <div className="absolute left-1/2 -translate-x-1/2 flex justify-center top-0 dt:max-w-[1008px] w-full h-full pointer-events-none z-10">
        <ToolBar
          captureMode={captureMode}
          resetCamera={resetCamera}
          setHelpViewer={setHelpViewer}
          css={toolbarCss}
        />
        {children}
      </div>
    </div>
  );
}
