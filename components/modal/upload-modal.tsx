"use client";
import Image from "next/image";
import ModalCanvas from "@/components/modal/upload-modal-canvas";
import Background from "@/components/modal/background";
import { formatFullDate } from "@/lib/string";
import { Dialog, Transition } from "@headlessui/react";
import { useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

import emptyImg from "@/app/assets/images/empty.png";

export default function UploadModal() {
  const [modelUrl, setModelUrl] = useState<any>(null);

  const [avatarStatus, setAvatarStatus] = useState("전체 공개");
  const [animation, setAnimation] = useState("Idle");

  const titleInputRef = useRef<any>(null);
  const avatarFileInputRef = useRef<any>(null);
  const avatarFileNameInputRef = useRef<any>(null);
  const descriptionInputRef = useRef<any>(null);

  const thumbnailFileInputRef = useRef<any>(null);
  const [thumnbailImage, setThumbnailImage] = useState<any>(null);

  const [currentTags, setCurrentTags] = useState<any>(null);

  const options = [
    { value: "전체 공개", label: "전체 공개" },
    { value: "나만 보기", label: "나만 보기" },
  ];

  const [animationOptions, setAnimationOptions] = useState<any>([
    { value: 4, label: "Idle" },
    { value: 1, label: "HipHopDancing" },
    { value: 2, label: "PutYourHandsUp" },
    { value: 3, label: "Thankful" },
  ]);

  const loadAnimation = (e: any) => {
    // setAvatarAnimation(e);
    setAnimation(e.label);
    // setSelectedAnime(e.value);
  };

  const loadAvatarFile = (e: any) => {
    setModelUrl(null);
    // setProgress(false);
    const file = avatarFileInputRef.current.files[0];

    if (!file) return;

    // setAvatarFile(avatarFileInputRef.current.files[0]);

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

  return (
    <div className="fixed inset-0 w-full h-full z-50">
      <div className="relative flex justify-center w-full h-full pt-[80px] dt:px-[32px] ph:px-[16px] px-0 ph:overflow-hidden overflow-y-scroll">
        <Background />
        <div className="relative w-full dt:max-w-[1288px] max-w-none h-ful bg-gray-300 rounded-t-[10px]">
          <div className="w-full ph:h-full h-auto flex ph:flex-row flex-col rounded-t-[10px] overflow-hidden">
            <div className="relative ph:grow grow-0 ph:h-full h-[550px]">
              <ModalCanvas
                modelUrl={modelUrl}
                animation={null}
                setAnimation={setAnimation}
              />
              {/* <div className="w-full h-full bg-gray-200"></div> */}
            </div>
            <div className="flex flex-col shrink-0 ph:w-[352px] w-full ph:h-full h-auto p-[24px] space-y-[24px] bg-[#FFFFFF] text-[14px] overflow-y-scroll scrollbar-hide">
              <p className="text-[24px] font-semibold">업로드</p>
              <div className="flex flex-col space-y-[40px]">
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#333333]">타이틀</p>
                  <input
                    type="text"
                    ref={titleInputRef}
                    className="w-full h-[35px] px-[14px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
                    placeholder="타이틀을 입력해주세요."
                    // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                    //   onChangeNickname(event.target.value);
                    // }}
                  ></input>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#333333]">파일</p>
                  <div className="flex space-x-[16px]">
                    <input
                      type="text"
                      ref={avatarFileNameInputRef}
                      disabled
                      className="
                      w-full h-full rounded-[10px] bg-[#FFFFFF] border-[1px] border-[#CCCCCC] border-solid px-[14px] outline-none"
                      placeholder="아바타 파일을 등록해주세요"
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
                        // onChange={(e: any) => console.log(e)}
                        onChange={loadAvatarFile}
                        ref={avatarFileInputRef}
                      />
                    </form>
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#333333]">설명</p>
                  <textarea
                    ref={descriptionInputRef}
                    className="sm:w-[482px] w-full h-[126px] p-[16px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC] outline-none"
                    placeholder="자기소개를 입력해주세요."
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
                    //   options={mostUsedTags}
                    value={currentTags}
                    instanceId={""}
                    onChange={(e: any) => {
                      setCurrentTags(e);
                    }}
                    className="flex items-center w-full h-[35px] "
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
                    className="basic-single"
                    classNamePrefix="select"
                    value={options.filter((option: any) => {
                      return option.label === avatarStatus;
                    })}
                    options={options}
                    onChange={(e: any) => setAvatarStatus(e)}
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
                    className="basic-single"
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
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#333333]">썸네일</p>
                  <div className="flex flex-col space-y-[24px]">
                    <div className="relative flex w-full aspect-[8/7] rounded-[10px] overflow-hidden">
                      <Image
                        src={thumnbailImage ? thumnbailImage : emptyImg}
                        className="object-cover w-full h-full"
                        width={512}
                        height={512}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col space-y-[16px]">
                      <div className="flex justify-center items-center w-full h-[42px] rounded-[10px] bg-[#368ADC] text-[#FFFFFF] cursor-pointer">촬영하기</div>
                      {/* <div className="flex justify-center items-center w-full h-[42px] rounded-[10px] bg-[#FFFFFF] border-solid border-[1px] border-[#D4D4D4] cursor-pointer">업로드</div> */}
                      <form>
                      <label htmlFor="thumbnailFile">
                        <div className="flex justify-center items-center w-full h-[42px] rounded-[10px] bg-[#FFFFFF] border-solid border-[1px] border-[#D4D4D4] cursor-pointer">
                          업로드
                        </div>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        id="thumbnailFile"
                        // onChange={(e: any) => console.log(e)}
                        onChange={handleFileInputChange}
                        ref={thumbnailFileInputRef}
                      />
                    </form>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#333333]">게시일</p>
                  <p>{formatFullDate(new Date().toString())}</p>
                </div>
                {/* <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">태그</p>
                  <div className="flex flex-wrap w-full">
                    {avatar.tags.map((item: any, index: any) => {
                      return (
                        <div
                          className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] whitespace-nowrap"
                          key={index}
                        >
                          {item.tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">썸네일</p>
                  <div className="relative flex w-full aspect-[8/7] overflow-hidden">
                    <Image
                      src={avatar.thumbnailUrl}
                      className="object-cover w-full h-full"
                      width={512}
                      height={512}
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-[16px]">
                  <p className="font-semibold text-[#9D9D9D]">업로드</p>
                  <p>{formatFullDate(avatar.created_at)}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
