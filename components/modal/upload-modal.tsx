"use client";
import Image from "next/image";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import checkImg from "@/app/assets/images/check_blue.svg";

import { useRouter } from "next/navigation";
import { uploadAvatarFile, UploadAvatarThumbnailFile } from "@/lib/storage";
import {
  insertAvatar,
  addAvatarTags,
  updateAvatarThumbnail,
} from "@/lib/supabase";
import FadeLoader from "react-spinners/FadeLoader";
import Viewer from "./viewer";
import Grid from "./grid";
import Camera from "./camera";
import Title from "./input-field/title";
import Avatar from "./input-field/avatar";
import Description from "./input-field/description";
import Tag from "./input-field/tag";
import Visible from "./input-field/visible";
import Animation from "./input-field/animation";
import Thumbnail from "./input-field/thumbnail";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function UploadModal({ mostUsedTags }: { mostUsedTags: any }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [captureMode, setCaptureMode] = useState(false);

  const [modelUrl, setModelUrl] = useState<any>(null);

  const [avatarStatus, setAvatarStatus] = useState("전체 공개");

  const [animation, setAnimation] = useState("Idle");
  const [animationValue, setAnimationValue] = useState<any>(4);

  const [avatarFile, setAvatarFile] = useState<any>(null);

  const avatarTitleInputRef = useRef<any>(null);
  const avatarFileInputRef = useRef<any>(null);
  const avatarFileNameInputRef = useRef<any>(null);
  const avatarDescriptionInputRef = useRef<any>(null);

  const thumbnailFileInputRef = useRef<any>(null);
  const [thumbnailImage, setThumbnailImage] = useState<any>(null);

  const [avatarTags, setAvatarTags] = useState<any>(null);

  const [status, setStatus] = useState("");

  const [borderColor, setBorderColor] = useState<string>("border-[#CCCCCC]");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const pageTopRef = useRef<HTMLDivElement>(null);
  const pageBottomRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    pageTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBottom = () => {
    pageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadAnimation = (e: any) => {
    setAnimationValue(e.value);
    setAnimation(e.label);
  };

  const loadAvatarFile = (e: any) => {
    setModelUrl(null);
    const file = avatarFileInputRef.current.files[0];

    if (!file) return;

    if (file.size >= MAX_FILE_SIZE) {
      alert("50MB 이상의 파일은 업로드할 수 없습니다");
      avatarFileNameInputRef.current.value = "";
      avatarFileInputRef.current.value = "";
      return;
    }

    setAvatarFile(avatarFileInputRef.current.files[0]);

    avatarFileNameInputRef.current.value = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setModelUrl(reader.result);
    };
  };

  const canvasRef = useRef<any>(null);

  function takeCapture() {
    const canvas = canvasRef.current;

    // Check if the canvas element is available
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    setThumbnailImage(canvas.toDataURL());

    scrollToBottom();
  }

  const onSavePortfolio = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!avatarTitleInputRef.current.value || !avatarFile) {
      setBorderColor("border-red-500");
      setIsEmpty(true);
      return;
    }

    setStatus("save");

    const uuid = uuidv4() + ".vrm";

    uploadAvatarFile(user?.id, uuid, avatarFile).then(async (data) => {
      const avatarData = await insertAvatar(
        user?.id,
        uuid,
        avatarTitleInputRef.current.value,
        avatarDescriptionInputRef.current.value,
        avatarStatus === "전체 공개" ? true : false,
        animationValue
      );

      if (avatarTags) {
        await addAvatarTags(avatarData![0].id, avatarTags);
      }

      if (typeof thumbnailImage === "string") {
        UploadAvatarThumbnailFile(user?.id, thumbnailImage).then(
          async (uuid) => {
            await updateAvatarThumbnail(user?.id, uuid, avatarData![0].id);
          }
        );
      }
      setStatus("done");

      optimizeAvatar(avatarFile, user?.id, avatarData![0].id, uuid);
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        router.back();
        router.refresh();
      }, 1000);
    }
  }, [status]);

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div className="relative flex justify-center w-full h-full pt-[80px] dt:px-[32px] ph:px-[16px] px-0 ph:overflow-hidden overflow-y-scroll">
        <Background />
        <div
          ref={pageTopRef}
          className="relative w-full dt:max-w-[1288px] max-w-none h-ful bg-gray-300 rounded-t-[10px]"
        >
          <div className="relative w-full ph:h-full h-auto flex ph:flex-row flex-col rounded-t-[10px] overflow-hidden">
            <div className="relative ph:grow grow-0 ph:h-full h-[550px]">
              <Viewer
                modelUrl={modelUrl}
                animation={animation}
                canvasRef={canvasRef}
                captureMode={captureMode}
                status={true}
                toolbarCss={
                  "absolute flex flex-row ph:top-[40px] bottom-[24px] ph:right-[40px] right-[24px] space-x-[16px] pointer-events-auto"
                }
              >
                <Grid captureMode={captureMode} />
                <Camera
                  captureMode={captureMode}
                  takeCapture={takeCapture}
                  setCaptureMode={setCaptureMode}
                />
              </Viewer>
            </div>
            <div className="p-[24px] bg-[#FFFFFF]">
              <div className="flex flex-col shrink-0 ph:w-[352px] w-full ph:h-full h-auto space-y-[24px] text-[14px] overflow-y-scroll scrollbar-hide">
                <p className="text-[24px] font-semibold">업로드</p>
                <div className="flex flex-col space-y-[40px]">
                  <Title
                    avatarTitleInputRef={avatarTitleInputRef}
                    borderColor={borderColor}
                    isEmpty={isEmpty}
                  />
                  <Avatar
                    avatarFileNameInputRef={avatarFileNameInputRef}
                    avatarFileInputRef={avatarFileInputRef}
                    loadAvatarFile={loadAvatarFile}
                    isEmpty={isEmpty}
                  />
                  <Description
                    avatarDescriptionInputRef={avatarDescriptionInputRef}
                  />
                  <Tag
                    mostUsedTags={mostUsedTags}
                    avatarTags={avatarTags}
                    setAvatarTags={setAvatarTags}
                  />
                  <Visible
                    options={options}
                    avatarStatus={avatarStatus}
                    setAvatarStatus={setAvatarStatus}
                  />
                  <Animation
                    animationOptions={animationOptions}
                    animation={animation}
                    loadAnimation={loadAnimation}
                  />
                  <Thumbnail
                    pageTopRef={pageTopRef}
                    pageBottomRef={pageBottomRef}
                    thumbnailImage={thumbnailImage}
                    setThumbnailImage={setThumbnailImage}
                    setCaptureMode={setCaptureMode}
                    thumbnailFileInputRef={thumbnailFileInputRef}
                  />
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">게시일</p>
                    <p>{formatFullDate(new Date().toString())}</p>
                  </div>
                  <div
                    className="flex justify-center items-center w-full h-[42px] !mt-[56px] rounded-[10px] bg-[#368ADC] text-[#FFFFFF] cursor-pointer"
                    onClick={onSavePortfolio}
                  >
                    저장하기
                  </div>
                </div>
              </div>
            </div>
            {status !== "" && (
              <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 !m-0">
                <div className="flex justify-center items-center w-[180px] h-[180px] bg-[#FFFFFF] rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
                  <div className="flex flex-col items-center space-y-[24px]">
                    {status === "save" ? (
                      <>
                        <FadeLoader
                          color="#2778C7"
                          className="!left-[22.5px] !w-[55px] !h-[55px]"
                        />
                        <p className="text-[18px] font-semibold">저장 중</p>
                      </>
                    ) : (
                      <>
                        <Image src={checkImg} alt="" />
                        <p className="text-[18px] font-semibold">저장 완료</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
async function optimizeAvatar(
  avatarFile: any,
  userId: any,
  avatarId: number,
  uuid: string
) {
  const formData = new FormData();
  formData.append("file", avatarFile);
  formData.append("name", avatarFile.name);
  formData.append("avatarId", avatarId.toString());
  formData.append("uuid", uuid);
  formData.append("supabaseUrl", process.env.NEXT_PUBLIC_SUPABASE_URL!);
  formData.append("id", userId);

  try {
    const response = await fetch("https://server.offing.me", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("File uploaded successfully");
    } else {
      console.log("data ", formData);
      console.error("Failed to upload file2");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const options = [
  { value: "전체 공개", label: "전체 공개" },
  { value: "나만 보기", label: "나만 보기" },
];

const animationOptions = [
  { value: 4, label: "Idle" },
  { value: 1, label: "HipHopDancing" },
  { value: 2, label: "PutYourHandsUp" },
  { value: 3, label: "Thankful" },
];
