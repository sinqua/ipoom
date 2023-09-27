"use client";
import Image from "next/image";
import leftImg from "@/app/assets/images/left_gray.svg";
import rightImg from "@/app/assets/images/right_gray.svg";
import bannerImg from "@/public/banner.png";
import socialImg from "@/public/social.png";
import hiImg from "@/public/hi.png";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export default function Carousel() {
  const [current, setCurrent] = useState(1);
  const [animationState, setAnimationState] = useState(false);
  const [cssArray, setCssArray] = useState(["", "", ""]);
  const [bgCssArray, setBgCssArray] = useState(["", "", ""]);

  const clickPrevImage = () => {
    if (animationState) return;

    if (current === 1) {
      setAnimation(1, 3, "left");

      setCurrent(3);
    } else {
      setAnimation(current, current - 1, "left");

      setCurrent(current - 1);
    }
  };

  const clickNextImage = () => {
    if (animationState) return;

    if (current === 3) {
      setAnimation(3, 1, "right");
      setCurrent(1);
    } else {
      setAnimation(current, current + 1, "right");
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    let timer =
      animationState &&
      setTimeout(() => {
        setAnimationState(false);
      }, 500);
  }, [animationState]);

  const setAnimation = (prev: number, next: number, direction: string) => {
    let tempArray = cssArray;
    let tempBgArray = bgCssArray;

    if (direction === "left") {
      tempArray[prev - 1] = "carouselSlideRightOut";
      tempArray[next - 1] = "carouselSlideRightIn";
    }

    if (direction === "right") {
      tempArray[prev - 1] = "carouselSlideLeftOut";
      tempArray[next - 1] = "carouselSlideLeftIn";
    }

    tempBgArray[prev - 1] = "carouselFadeOut";
    tempBgArray[next - 1] = "carouselFadeIn";

    setCssArray(tempArray);
    setBgCssArray(tempBgArray);
    setAnimationState(true);
  };

  return (
    <div className="relative flex shrink-0 justify-center items-center w-full tb:h-[360px] h-auto tb:aspect-auto aspect-[16/7] bg-pink-100">
      {Object.keys(numberToImageMap).map((key: any, index: number) => (
        <Image
          draggable={false}
          src={numberToImageMap[key]}
          className={cn(
            "absolute top-0 left-0 w-full h-full !m-0 select-none",
            index !== 0 && "opacity-0",
            bgCssArray[index]
          )}
          width={512}
          height={512}
          alt=""
          key={index}
        />
      ))}
      <div className="absolute top-0 left-0 w-full h-full !m-0 bg-white/50 backdrop-blur-[55px]" />
      <div className="relative flex justify-center items-center tb:w-auto w-full tb:h-auto h-full">
        <div
          className="absolute tb:left-[-40px] left-[16px] flex justify-center items-center tb:w-[80px] w-[40px] tb:h-[80px] h-[40px] rounded-full bg-[#FFFFFF80]  cursor-pointer z-10"
          onClick={clickPrevImage}
        >
          <Image
            draggable={false}
            src={leftImg}
            className="relative tb:right-[4px] right-0 w-auto tb:h-[40px] h-[20px]"
            width={512}
            height={512}
            alt=""
          />
        </div>
        <div className="relative tb:w-[640px] w-full tb:h-[280px] h-full tb:rounded-[8px] rounded-none tb:shadow-[0px_3px_6px_rgba(0,0,0,0.16)] shadow-none overflow-hidden">
          {Object.keys(numberToImageMap).map((key: any, index: number) => (
            <Image
              draggable={false}
              src={numberToImageMap[key]}
              className={cn(
                "absolute top-0 left-0 w-full h-full select-none",
                index !== 0 && "translate-x-[100%]",
                cssArray[index]
              )}
              width={512}
              height={512}
              alt=""
              key={index}
            />
          ))}
          <div className="absolute bottom-[8px] right-[16px] flex justify-center items-center w-[84px] h-[35px] rounded-full bg-[#00000040]">
            <p className="text-[#FFFFFF]">{`${current} / 3`}</p>
          </div>
        </div>
        <div
          className="absolute tb:right-[-40px] right-[16px] flex justify-center items-center tb:w-[80px] w-[40px] tb:h-[80px] h-[40px] rounded-full bg-[#FFFFFF80] cursor-pointer z-10"
          onClick={clickNextImage}
        >
          <Image
            draggable={false}
            src={rightImg}
            className="relative tb:left-[4px] left-0 w-auto tb:h-[40px] h-[20px]"
            width={512}
            height={512}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

const numberToImageMap: { [key: number]: any } = {
  1: bannerImg,
  2: socialImg,
  3: hiImg,
};
