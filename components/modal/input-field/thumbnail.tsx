import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import { useEffect } from "react";

interface ThumbnailProps {
  pageTopRef: any;
  pageBottomRef: any;
  thumbnailImage?: any;
  setThumbnailImage: any;
  setCaptureMode: any;
  thumbnailFileInputRef: any;
  isEmpty: boolean;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function Thumbnail({
  pageTopRef,
  pageBottomRef,
  thumbnailImage,
  setThumbnailImage,
  setCaptureMode,
  thumbnailFileInputRef,
  isEmpty,
}: ThumbnailProps) {
  const scrollToTop = () => {
    pageTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];

    if (file.size >= MAX_FILE_SIZE) {
      alert("50MB 이상의 파일은 업로드할 수 없습니다");
      thumbnailFileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setThumbnailImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    thumbnailFileInputRef.current.value = "";
  }, [thumbnailImage]);

  return (
    <div ref={pageBottomRef} className="flex flex-col space-y-[16px]">
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
        <div className="!mt-[5px] pl-[5px] text-red-500">
          {isEmpty ? "아바타 썸네일이 필요합니다" : ""}
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
              ref={thumbnailFileInputRef}
              className="hidden"
              type="file"
              id="thumbnailFile"
              onChange={handleFileInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
