"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";

import Footer from "@/components/basic-layout/Footer";
import Hamburger from "@/components/basic-layout/Hamburger";
// import Header from "@/components/basic-layout/Header";
// import Navbar from "@/components/basic-layout/Navbar";
import Navbar from "@/features/Navbar/Navbar";
import Header from "@/features/Edit/Edit.Header";

import emptyImg from "@/app/assets/images/empty.png";
import Link from "next/link";

export default function Page() {
  const imgRef = useRef<any>();
  const [currentTags, setCurrentTags] = useState<any>(null);


  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Hamburger>
        <Navbar />
      </Hamburger>
      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header />
        <div className="flex justify-center w-full grow md:px-0 px-[16px] py-[40px]">
          <div className="relative flex flex-col md:max-w-[1008px] w-full h-full space-y-[64px]">
            <div className="flex flex-col">
              <p className="mb-[16px] text-[20px] font-semibold">프로필 사진</p>
              <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
                최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.
                <br />
                타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로
                변경할 수 있습니다.
              </p>
              <div className="flex  items-center sm:space-x-[32px] space-x-[24px]">
                <Image
                  src={emptyImg}
                  width={160}
                  height={160}
                  className="sm:h-[160px] h-[100px] sm:w-[160px] w-[100px] bg-gray-200 rounded-full border-none"
                  alt=""
                />
                <form>
                  <label
                    className="flex justify-center items-center px-[16px] py-[11px] rounded-[10px] bg-[#368ADC] text-white cursor-pointer"
                    htmlFor="profileImg"
                  >
                    프로필 변경
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    id="profileImg"
                    // onChange={loadImgFile}
                    ref={imgRef}
                  />
                </form>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mb-[16px] text-[20px] font-semibold">닉네임</p>
              <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
                타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할
                수 있습니다.
                <br />
                닉네임 변경은 2달에 1회 진행할 수 있습니다.
              </p>
              <div className="flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
                <input
                  type="text"
                  className="grow h-full outline-none text-sm"
                  placeholder="닉네임을 입력해주세요."
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mb-[16px] text-[20px] font-semibold">
                오픈카톡 링크
              </p>
              <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
                사용중인 오픈카톡 전체 링크를 입력해주세요.
                <br />
                {"예시) https://open.kakao.com/o/s7l8njtf"}
              </p>
              <div className="flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
                <input
                  type="text"
                  className="grow h-full outline-none text-sm"
                  placeholder="오픈카톡 링크를 입력해주세요."
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mb-[16px] text-[20px] font-semibold">
                토스아이디 링크
              </p>
              <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
                사용중인 토스 익명송금 전체 링크를 입력해주세요.
                <br />
                {"예시) https://toss.me/istick"}
              </p>
              <div className="flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
                <input
                  type="text"
                  className="grow h-full outline-none text-sm"
                  placeholder="토스아이디 링크를 입력해주세요."
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mb-[16px] text-[20px] font-semibold">태그</p>
              <p className="mb-[24px] text-[#9D9D9D] leading-[25px]">
                한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)
              </p>
              <div className="mb-[20px]">
                <CreatableSelect
                  isMulti
                  //   options={mostUsedTags}
                  value={currentTags}
                  instanceId={""}
                  onChange={(e: any) => {
                    setCurrentTags(e);
                  }}
                  className="flex w-full items-center sm:w-[482px] h-[47px]"
                  placeholder={"태그를 입력해주세요"}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "100%",
                      width: "100%",
                    }),
                    placeholder: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#CCCCCC",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
