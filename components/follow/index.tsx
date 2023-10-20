"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./card";
import Image from "next/image";
import leftImg from "@/app/assets/images/left_gray.svg";
import rightImg from "@/app/assets/images/right_gray.svg";
import { cn } from "@/lib/utils";

interface FollowProps {
  users: any;
}

export default function Follow({ users }: FollowProps) {
  const myRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  const totalPageCount = Math.ceil(users.length / 10);

  useEffect(() => {
    const pageNumArray: number[] = Array.from(
      { length: totalPageCount },
      (_, i) => i + 1
    );

    const result: number[][] = [];
    for (let i = 0; i < pageNumArray.length; i += 5)
      result.push(pageNumArray.slice(i, i + 5));

    setCurrentPageArray(result[0]);
    setTotalPageArray(result);
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const changeToPrevPage = () => {
    if (currentPage === 1) return;

    if (currentPage % 5 === 1)
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / 5) - 1]);

    setCurrentPage(currentPage - 1);
  };

  const changeToNextPage = () => {
    if (currentPage === totalPageCount) return;

    if (currentPage % 5 === 0)
      setCurrentPageArray(totalPageArray[currentPage / 5]);

    setCurrentPage(currentPage + 1);
  };

  return (
    <div ref={myRef} className="flex flex-col w-full space-y-[24px]">
      <div className="flex flex-col space-y-[16px]">
        <p className="text-[20px] font-semibold">팔로우</p>
        <p className="text-[#9D9D9D]">
          회원님이 팔로우한 유저들의 최근 아바타입니다.
        </p>
      </div>
      <div className="grid ph:grid-cols-2 grid-cols-1 gap-x-[16px] ph:gap-y-[24px] gap-y-[36px]">
        {users
          .slice(10 * (currentPage - 1), 10 * currentPage)
          ?.map((user: any, index: number) => {
            return <Card userData={user} key={index} />;
          })}
      </div>
      {users.length === 0 ? (
        <div></div>
      ) : (
        <div className="flex justify-center items-center h-[32px] space-x-[8px] !mt-[64px]">
          <div
            className="flex justify-center items-center w-[16px] h-[16px] cursor-pointer"
            onClick={changeToPrevPage}
          >
            <Image
              draggable={false}
              src={leftImg}
              className="relative w-auto h-[16px]"
              width={512}
              height={512}
              alt=""
            />
          </div>
          {currentPageArray?.map((item: number, index: number) => {
            return (
              <div
                className={cn(
                  "flex justify-center items-center w-[32px] h-[32px] rounded-[8px] text-[18px] cursor-pointer",
                  item === currentPage
                    ? "text-[#368ADC] font-semibold"
                    : "text-[#333333] hover:bg-[#F6F6F6]"
                )}
                key={index}
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </div>
            );
          })}
          <div
            className="flex justify-center items-center w-[16px] h-[16px] cursor-pointer"
            onClick={changeToNextPage}
          >
            <Image
              draggable={false}
              src={rightImg}
              className="relative w-auto h-[16px]"
              width={512}
              height={512}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}
