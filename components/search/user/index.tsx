"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./card";
import Image from "next/image";
import leftImg from "@/app/assets/images/left_gray.svg";
import rightImg from "@/app/assets/images/right_gray.svg";
import { cn } from "@/lib/utils";
import cautionImg from "@/app/assets/images/caution.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import Select from "react-select";
import { useSearchParams } from "next/navigation";

interface UserProps {
  users: any;
  setUsers: any;
}

export default function User({ users, setUsers }: UserProps) {
  const supabase = createClientComponentClient<Database>();

  const myRef = useRef<any>(null);

  const [session, setSession] = useState<any>();
  const searchParams = useSearchParams();
  const [sortOption, setSortOption] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
  };

  useEffect(() => {
    getSession();

    let totalPageCount = Math.ceil(users.length / 10);

    const pageNumArray: number[] = Array.from(
      { length: totalPageCount },
      (_, i) => i + 1
    );

    const result: number[][] = [];
    for (let i = 0; i < pageNumArray.length; i += 5)
      result.push(pageNumArray.slice(i, i + 5));

    setCurrentPageArray(result[0]);
    setTotalPageArray(result);
  }, [users]);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    if (sortOption === "최신순") {
      const sortedUsers = users.slice(0).sort((a: any, b: any) => {
        const dateA = new Date(a.created_at!);
        const dateB = new Date(b.created_at!);
        return dateB.getTime() - dateA.getTime();
      });

      setUsers(sortedUsers);
    }

    if (sortOption === "오래된순") {
      const sortedUsers = users.slice(0).sort((a: any, b: any) => {
        const dateA = new Date(a.created_at!);
        const dateB = new Date(b.created_at!);
        return dateA.getTime() - dateB.getTime();
      });

      setUsers(sortedUsers);
    }
  }, [sortOption]);

  const changeToPrevPage = () => {
    if (currentPage === 1) return;

    if (currentPage % 5 === 1)
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / 5) - 1]);

    setCurrentPage(currentPage - 1);
  };

  const changeToNextPage = () => {
    let totalPageCount = Math.ceil(users.length / 10);

    if (currentPage === totalPageCount) return;

    if (currentPage % 5 === 0)
      setCurrentPageArray(totalPageArray[currentPage / 5]);

    setCurrentPage(currentPage + 1);
  };

  return (
    <div ref={myRef} className="flex flex-col w-full space-y-[24px]">
      <div className="flex justify-between items-center w-full">
        <p className="text-[20px] font-semibold">유저</p>
        <Select
          className={cn(
            "basic-single w-[140px] px-[1px]",
            users.length === 0 && "hidden"
          )}
          classNamePrefix="select"
          value={sortOptions.filter((option: any) => {
            return option.label === sortOption;
          })}
          options={sortOptions}
          onChange={(e: any) => setSortOption(e.value)}
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
              borderColor: "#CCCCCC !important",
              boxShadow: "none !important",
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: "0",
            }),
          }}
        />
      </div>
      {users.length > 0 ? (
        <>
          <div className="grid ph:grid-cols-2 grid-cols-1 gap-x-[16px] ph:gap-y-[24px] gap-y-[36px]">
            {users
              .slice(10 * (currentPage - 1), 10 * currentPage)
              ?.map((user: any, index: number) => {
                return (
                  <Card
                    session={session}
                    userData={user}
                    index={index}
                    key={index}
                  />
                );
              })}
          </div>
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
        </>
      ) : (
        <div className="flex flex-col justify-center items-center !mt-[80px] space-y-[32px]">
          <Image src={cautionImg} className="w-[100px] h-[100px]" alt="" />
          <div className="flex flex-col items-center space-y-[16px]">
            <p className="text-[18px] font-semibold">
              &apos;{searchParams.get("content")}&apos;에 대한 검색 결과가
              없습니다.
            </p>
            <p className="text-[14px] text-[#9D9D9D]">
              다른 키워드로 검색해주세요.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const sortOptions = [
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];
