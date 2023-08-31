"use client";
import Image from "next/image";
import ModalCanvas from "@/components/modal/edit-modal-canvas";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { useEffect, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

import emptyImg from "@/app/assets/images/empty.png";
import saveImg from "@/app/assets/images/save.svg";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { uploadAvatarFile, UploadAvatarThumbnailFile } from "@/lib/storage";
import {
  insertAvatar,
  addAvatarTags,
  updateAvatar,
  updateAvatarName,
  updateAvatarTags,
  updateAvatarThumbnail,
} from "@/lib/supabase";
import FadeLoader from "react-spinners/FadeLoader";

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

export default function EditModal({
  avatar,
  model,
  mostUsedTags,
}: {
  avatar: any;
  model: any;
  mostUsedTags: any;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [captureMode, setCaptureMode] = useState(false);

  const [status, setStatus] = useState("");

  const [modelUrl, setModelUrl] = useState<any>(model.signedUrl);

  const [avatarStatus, setAvatarStatus] = useState(
    avatar.visible ? "전체 공개" : "나만 보기"
  );

  const [animation, setAnimation] = useState(
    animationOptions.find((item: any) => item.value === avatar.animation)?.label
  );
  const [animationValue, setAnimationValue] = useState<any>(avatar.animation);

  const [avatarFile, setAvatarFile] = useState<any>(null);

  const avatarTitleInputRef = useRef<any>(null);
  const avatarFileInputRef = useRef<any>(null);
  const avatarFileNameInputRef = useRef<any>(null);
  const avatarDescriptionInputRef = useRef<any>(null);

  const thumbnailFileInputRef = useRef<any>(null);
  const [thumbnailImage, setThumbnailImage] = useState<any>(avatar.thumbnail);

  const [avatarTags, setAvatarTags] = useState<any>(
    avatar.tags.map((tag: any) => ({
      label: tag.tag,
      value: tag.tag,
    }))
  );
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
    // setProgress(false);
    const file = avatarFileInputRef.current.files[0];

    if (!file) return;

    setAvatarFile(avatarFileInputRef.current.files[0]);

    avatarFileNameInputRef.current.value = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setModelUrl(reader.result);
    };
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setThumbnailImage(reader.result);
    };

    reader.readAsDataURL(file);
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
    if (!avatarTitleInputRef.current.value) {
      setBorderColor("border-red-500");
      setIsEmpty(true);
      return;
    }

    setStatus("save");

    const avatarData = await updateAvatar(
      avatar.id,
      avatarTitleInputRef.current.value,
      avatarDescriptionInputRef.current.value,
      avatarStatus === "전체 공개" ? true : false,
      animationValue
    );

    await updateAvatarTags(avatar.id, avatarTags);

    if (thumbnailImage.includes("data:image/png;base64,")) {
      UploadAvatarThumbnailFile(session?.user.id, thumbnailImage).then(
        async (uuid) => {
          await updateAvatarThumbnail(session?.user.id, uuid, avatar.id);
        }
      );
    }

    if (avatarFile) {
      /* Python 서버 파일 업로드 */
      const formData = new FormData();
      formData.append("file", avatarFile);
      formData.append("name", avatarFile.name);
      if (session) formData.append("id", session?.user.id);

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
      /* Python 서버 파일 업로드 끝 */

      uploadAvatarFile(session?.user.id, avatarFile.name, avatarFile).then(
        async (data) => {
          await updateAvatarName(avatar.id, avatarFile.name);
        }
      );
    }

    setStatus("done");
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
              <ModalCanvas
                canvasRef={canvasRef}
                modelUrl={modelUrl}
                animation={animation}
                setAnimation={setAnimation}
                captureMode={captureMode}
                setCaptureMode={setCaptureMode}
                takeCapture={takeCapture}
              />
            </div>
            <div className="p-[24px] bg-[#FFFFFF]">
              <div className="flex flex-col shrink-0 ph:w-[352px] w-full ph:h-full h-auto space-y-[24px] text-[14px] overflow-y-scroll scrollbar-hide">
                <p className="text-[24px] font-semibold">업로드</p>
                <div className="flex flex-col space-y-[40px]">
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">타이틀</p>
                    <input
                      type="text"
                      ref={avatarTitleInputRef}
                      className={twMerge(
                        "w-full h-[35px] px-[14px] rounded-[10px] bg-white border-solid border-[1px] outline-none",
                        borderColor
                      )}
                      placeholder="타이틀을 입력해주세요."
                      defaultValue={avatar.name}
                    ></input>
                    <div className="!mt-[5px] pl-[5px] text-red-500">
                      {isEmpty ? "아바타 이름이 필요합니다" : ""}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">파일</p>
                    <div className="flex space-x-[16px]">
                      <input
                        type="text"
                        ref={avatarFileNameInputRef}
                        disabled
                        className="w-full h-[35px] rounded-[10px] bg-[#FFFFFF] border-[1px] border-[#CCCCCC] border-solid px-[14px] outline-none"
                        placeholder="아바타 파일을 등록해주세요"
                        defaultValue={avatar.vrm}
                      />
                      <form>
                        <label htmlFor="avatarFile">
                          <div className="flex justify-center items-center w-[56px] h-[35px] bg-[#368ADC] rounded-[10px] text-[#FFFFFF] cursor-pointer">
                            변경
                          </div>
                        </label>
                        <input
                          className="hidden"
                          type="file"
                          id="avatarFile"
                          onChange={loadAvatarFile}
                          ref={avatarFileInputRef}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">설명</p>
                    <textarea
                      ref={avatarDescriptionInputRef}
                      className="w-full h-[126px] p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
                      placeholder="자기소개를 입력해주세요."
                      defaultValue={avatar.description}
                      // value={profile.description}
                      // onChange={() =>
                      //   setTextareaCount(inputDescriptionRef.current.value.length)
                      // }
                    />
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">태그</p>
                    <CreatableSelect
                      isMulti
                      options={mostUsedTags}
                      value={avatarTags}
                      instanceId={""}
                      onChange={(e: any) => {
                        setAvatarTags(e);
                      }}
                      className="flex items-center w-full h-[35px] px-[1px]"
                      placeholder={"태그를 입력해주세요"}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "100%",
                          width: "100%",
                          borderRadius: "10px",
                        }),
                        placeholder: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#CCCCCC",
                        }),
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">공개 범위</p>
                    <Select
                      className="basic-single px-[1px]"
                      classNamePrefix="select"
                      value={options.filter((option: any) => {
                        return option.label === avatarStatus;
                      })}
                      options={options}
                      onChange={(e: any) => setAvatarStatus(e.label)}
                      isSearchable={false}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: "#2778C7",
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "100%",
                          width: "100%",
                          backgroundColor: "#FFFFFF80",
                          borderRadius: "10px",
                          paddingLeft: "14px",
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "0",
                        }),
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">애니메이션</p>
                    <Select
                      className="basic-single px-[1px]"
                      classNamePrefix="select"
                      value={animationOptions.filter((option: any) => {
                        return option.label === animation;
                      })}
                      options={animationOptions}
                      onChange={(e: any) => loadAnimation(e)}
                      isSearchable={false}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: "#2778C7",
                        },
                      })}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          height: "100%",
                          width: "100%",
                          backgroundColor: "#FFFFFF80",
                          borderRadius: "10px",
                          paddingLeft: "14px",
                        }),
                        valueContainer: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "0",
                        }),
                      }}
                    />
                  </div>
                  <div
                    ref={pageBottomRef}
                    className="flex flex-col space-y-[16px]"
                  >
                    <p className="font-semibold text-[#333333]">썸네일</p>
                    <div className="flex flex-col space-y-[24px]">
                      <div className="relative flex w-full aspect-[8/7] rounded-[10px] overflow-hidden border-solid border-[1px] border-[#CCCCCC] ">
                        <Image
                          src={thumbnailImage ? thumbnailImage : emptyImg}
                          className="object-cover w-full h-full"
                          width={512}
                          height={512}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-row space-x-[16px]">
                        <div
                          className="flex justify-center items-center w-full h-[42px] rounded-[10px] bg-[#368ADC] text-[#FFFFFF] cursor-pointer"
                          onClick={() => {
                            setCaptureMode(true);
                            scrollToTop();
                          }}
                        >
                          촬영하기
                        </div>
                        <form className="w-full">
                          <label
                            htmlFor="thumbnailFile"
                            className="flex justify-center items-center w-full h-[42px] rounded-[10px] bg-[#FFFFFF] border-solid border-[1px] border-[#D4D4D4] cursor-pointer"
                          >
                            업로드
                          </label>
                          <input
                            className="hidden"
                            type="file"
                            id="thumbnailFile"
                            onChange={handleFileInputChange}
                            ref={thumbnailFileInputRef}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-[16px]">
                    <p className="font-semibold text-[#333333]">게시일</p>
                    <p>{formatFullDate(avatar.created_at)}</p>
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
                        <Image src={saveImg} alt="" />
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
