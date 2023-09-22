"use client";
import Image from "next/image";
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
    <div className="relative flex justify-center items-center space-x-[20px] w-full h-[500px] bg-pink-100">
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
      <div className="absolute top-0 left-0 w-full h-full !m-0 bg-white/50 backdrop-blur-[55px]"></div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-blue-200 cursor-pointer z-10"
        onClick={clickPrevImage}
      ></div>
      <div className="relative w-[400px] h-[200px] overflow-hidden">
        {Object.keys(numberToImageMap).map((key: any, index: number) => (
          <Image
            draggable={false}
            src={numberToImageMap[key]}
            className={cn(
              "absolute top-0 left-0 w-full h-full select-none",
              index !== 0 && "translate-x-[400px]",
              cssArray[index]
            )}
            width={512}
            height={512}
            alt=""
            key={index}
          />
        ))}
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-blue-200 cursor-pointer z-10"
        onClick={clickNextImage}
      ></div>
    </div>
  );
}

const numberToImageMap: { [key: number]: any } = {
  1: bannerImg,
  2: socialImg,
  3: hiImg,
};
