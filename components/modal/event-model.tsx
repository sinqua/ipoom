"use client";
import * as THREE from "three";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  MToonMaterial,
  MToonMaterialLoaderPlugin,
  VRM,
  VRMLoaderPlugin,
  VRMUtils,
} from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "@/utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useThree } from "@react-three/fiber";
import { Circle, Resize, useCamera } from "@react-three/drei";
import { Color } from "three";

export interface ModelProps {
  modelUrl: string;
  animation: string;
  setProgress: (done: boolean) => void;
}

export default function Model({
  modelUrl,
  animation,
  setProgress,
}: ModelProps) {
  const [vrm, setVrm] = useState<VRM>(null!);
  const vrmRef = useRef<any>();
  const [actions, setActions] = useState<any>({});

  const [currentAnimation, setCurrentAnimation] = useState(animation);

  const animationMixer = useMemo<THREE.AnimationMixer>(() => {
    if (!vrm) return null!;

    const mixer = new THREE.AnimationMixer(vrm.scene);
    loadDefaultAnimation(vrm, setActions);

    return mixer;
  }, [vrm]);

  useEffect(() => {
    setVrm(null!);
    setActions({});
  }, [modelUrl]);

  useEffect(() => {
    if (Object.keys(actions).length !== 5) return;
    if (currentAnimation === animation) return;

    playNextAction(
      animationMixer,
      actions,
      currentAnimation,
      animation,
      setCurrentAnimation
    );
  }, [animation]);

  useEffect(() => {
    if (actions["Landing"] && actions[animation]) {
      setTimeout(() => {
        var landingAction = animationMixer.clipAction(actions["Landing"]);
        var idleAction = animationMixer.clipAction(actions[animation]);

        landingAction.loop = THREE.LoopOnce;
        landingAction.clampWhenFinished = true;
        landingAction.play();

        const materials: MToonMaterial[] = vrm.materials! as MToonMaterial[];
        materials.forEach((material: MToonMaterial) => {
          material.opacity = 1;
        });

        animationMixer.addEventListener("finished", (e: any) => {
          if (e.action._clip.name === "Landing") {
            landingAction.fadeOut(0.5);
            idleAction.reset().fadeIn(0.5).play();

            setCurrentAnimation(animation);
          }
        });
      }, 500);
    }
  }, [actions]);

  useEffect(() => {
    if (!modelUrl) {
      setProgress(true);
      return;
    }

    setProgress(false);
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.register((parser) => {
      return new MToonMaterialLoaderPlugin(parser);
    });

    loader.load(
      modelUrl,
      async (gltf) => {
        setProgress(true);

        const vrm: VRM = gltf.userData.vrm;

        setVrm(OptimizeModel(vrm));
      },
      (progress) => {},
      (error) => console.log("Error loading model", error)
    );
  }, [modelUrl]);

  useFrame((state, delta) => {
    animationMixer?.update(delta);
    vrm?.update(delta);
  });

  return (
    <>
      {vrm && (
        <Resize height width>
          <primitive
            ref={vrmRef}
            object={vrm.scene}
            rotation={[0, 135, 0]}
            position={[0, -0.48, 0]}
            children-0-castShadow
          ></primitive>
        </Resize>
      )}
    </>
  );
}

function playNextAction(
  animationMixer: THREE.AnimationMixer,
  actions: any,
  currentAnimation: string,
  animation: string,
  setCurrentAnimation: any
) {
  var currentAction = animationMixer.clipAction(actions[currentAnimation]);
  var nextAction = animationMixer.clipAction(actions[animation]);

  currentAction.fadeOut(0.5);
  nextAction.reset().fadeIn(0.5).play();

  setCurrentAnimation(animation);
}

function loadDefaultAnimation(vrm: VRM, setActions: any) {
  LoadMixamoAnimation("/animation/Landing.fbx", vrm).then((clip) => {
    clip.name = "Landing";
    setActions((prevActions: any) => ({ ...prevActions, Landing: clip }));
  });

  LoadMixamoAnimation("/animation/Idle.fbx", vrm).then((clip) => {
    clip.name = "Idle";
    setActions((prevActions: any) => ({ ...prevActions, Idle: clip }));
  });

  LoadMixamoAnimation("/animation/HipHopDancing.fbx", vrm).then((clip) => {
    clip.name = "HipHopDancing";
    setActions((prevActions: any) => ({
      ...prevActions,
      HipHopDancing: clip,
    }));
  });

  LoadMixamoAnimation("/animation/PutYourHandsUp.fbx", vrm).then((clip) => {
    clip.name = "PutYourHandsUp";
    setActions((prevActions: any) => ({
      ...prevActions,
      PutYourHandsUp: clip,
    }));
  });

  LoadMixamoAnimation("/animation/Thankful.fbx", vrm).then((clip) => {
    clip.name = "Thankful";
    setActions((prevActions: any) => ({ ...prevActions, Thankful: clip }));
  });
}

function OptimizeModel(vrm: VRM) {
  VRMUtils.deepDispose(vrm.scene);
  VRMUtils.removeUnnecessaryJoints(vrm.scene);
  VRMUtils.removeUnnecessaryVertices(vrm.scene);

  const materials: MToonMaterial[] = vrm.materials! as MToonMaterial[];

  materials.forEach((material: MToonMaterial) => {
    material.toneMapped = false;
    material.transparent = true;
    material.opacity = 0;
  });
  return vrm;
}
