"use client";

import * as THREE from "three";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { MToonMaterial, MToonMaterialLoaderPlugin, VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "../utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useThree } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import { Color } from "three";
import { GLTF } from "three-stdlib";

export interface ModelProps {
  animation: number | null;
  modelUrl: string | undefined;
  setProgress: (done: boolean) => void;
}

const Model: FC<ModelProps> = ({
  animation,
  modelUrl,
  setProgress,
}) => {
  const [vrm, setVrm] = useState<VRM>(null!);
  const vrmRef = useRef<any>();
  const [actions, setActions] = useState<any>({});

  const animationMixer = useMemo<THREE.AnimationMixer>(() => {
    if (!vrm) return null!;

    const mixer = new THREE.AnimationMixer(vrm.scene);
    const animationUrl = numberToUrl(animation? animation : 1);

    LoadMixamoAnimation("/animation/Landing.fbx", vrm).then((clip) => {
      clip.name = "Landing";
      setActions((prevActions: any) => ({...prevActions, "Landing": clip}));
    });

    LoadMixamoAnimation(animationUrl, vrm).then((clip) => {
      clip.name = "Selected";
      setActions((prevActions: any) => ({...prevActions, "Selected": clip}));
    });

    return mixer;
  }, [animation, vrm]);

  useEffect(() => {
    if(actions['Landing'] && actions['Selected']) {
      setTimeout(() => {
        var landingAction = animationMixer.clipAction(actions['Landing']);
        var idleAction = animationMixer.clipAction(actions['Selected']);

        landingAction.loop = THREE.LoopOnce;
        landingAction.clampWhenFinished = true;
        landingAction.play();

        vrmRef.current.parent.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = 1;
          }
        });

        animationMixer.addEventListener('finished', (e) => {
          if(e.action._clip.name === "Landing") {
            idleAction.stop();
            idleAction.crossFadeFrom( landingAction, 0.5, false).play();
          }
        });
      }, 500);
    }
  }, [actions])

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.register((parser) => {
      return new MToonMaterialLoaderPlugin(parser);
    });

    loader.load(
      modelUrl? modelUrl : "/Karin_spring.vrm",
      async (gltf) => {
        setProgress(true);

        const lessMorph = RemoveTooMuchMorphs(gltf);

        const vrm: VRM = lessMorph.userData.vrm;

        vrm.scene.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });

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
        <primitive
          ref={vrmRef}
          object={vrm.scene}
          position={[0, -0.67, 0]}
          rotation={[0, 135, 0]}
          children-0-castShadow
        >
          <Circle
            args={[0.35]}
            rotation-x={-Math.PI / 2}
            receiveShadow
            renderOrder={2}
          >
            <shaderMaterial attach="material" args={[gradientShader]} />
          </Circle>
        </primitive>
      )}
    </>
  );
};

export default Model;

const gradientShader = {
  uniforms: {
    color1: { value: new Color("#A0A0A0") }, // Start color
    color2: { value: new Color("#FAF9F6") }, // End color
  },
  vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
  fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            float alpha = 1.34 - dist; // Calculate alpha value based on distance
            gl_FragColor = vec4(mix(color1, color2, dist), alpha);
          }
    `,
};

function TraverseSkinnedMeshNodes(node: any) {
  if (node.type === 'SkinnedMesh') {
    /* Heuristic: face will be have more than 50 morphs */
    if(node.geometry.morphAttributes.position?.length > 50) {
      node.geometry.morphAttributes.position.length = 0;
      node.geometry.morphAttributes.normal.length = 0;
      node.geometry.morphTargetsRelative = false;
      node.updateMorphTargets();
    }
  }

  if (node.children) {
    node.children.forEach((child: any) => {
      TraverseSkinnedMeshNodes(child);
    });
  }
}

function RemoveTooMuchMorphs(gltf: GLTF) {
  gltf.scene.traverse((node) => {
    TraverseSkinnedMeshNodes(node);
  });

  return gltf;
}

function OptimizeModel(vrm: VRM) {
  VRMUtils.deepDispose(vrm.scene);
  VRMUtils.removeUnnecessaryJoints(vrm.scene);
  VRMUtils.removeUnnecessaryVertices(vrm.scene);

  const materials : MToonMaterial[] = vrm.materials! as MToonMaterial[]; 

  materials.forEach((material: MToonMaterial) => {
    material.toneMapped = false;
  });
  return vrm;
}


const numberToUrl = (num: number) => {
  switch (num) {
    case 1:
      return "/animation/HipHopDancing.fbx";
    case 2:
      return "/animation/PutYourHandsUp.fbx";
    case 3:
      return "/animation/Thankful.fbx";
    case 4:
      return "/animation/Idle.fbx";
    default:
      return "/animation/Idle.fbx";
  }
};