"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./card";
import Image from "next/image";
import leftImg from "@/app/assets/images/left_gray.svg";
import rightImg from "@/app/assets/images/right_gray.svg";
import { cn } from "@/lib/utils";
import cautionImg from "@/app/assets/images/caution.svg";
import { useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function List() {
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();

  const myRef = useRef<any>(null);

  const [avatars, setAvatars] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  const getPopularAvatars = async () => {
    const avatarArray = [];

    const { data: avatarsData, error: avatarsError } = await supabase
      .from("avatars")
      .select("*, tags (*), likes (*)")
      .order("created_at", { ascending: false });

    if (avatarsData) {
      const sortedAvatars = avatarsData.sort((a, b) => {
        if (a.likes.length < b.likes.length) return 1;
        if (a.likes.length > b.likes.length) return -1;
        return 0;
      });

      for (const avatar of sortedAvatars!) {
        const { data: user } = await supabase
          .from("profiles")
          .select(`*,  tags (tag)`)
          .eq("user_id", avatar.user_id!)
          .single();

        if (avatar.thumbnail === null) avatar.thumbnail = "/VerticalModel.png";

        avatarArray.push({
          ...avatar,
          user: user,
        });
      }

      setAvatars(avatarArray);
    }
  };

  const getFollowAvatars = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const avatarArray = [];

    const { data: followsData, error: followsError } = await supabase
      .from("follows")
      .select("*")
      .eq("source_user_id", session?.user.id);

    let followAvatars: any[] = [];

    if (followsData) {
      for (const follow of followsData) {
        const { data: avatarsData, error: avatarsError } = await supabase
          .from("avatars")
          .select("*, tags (*), likes (*)")
          .eq("user_id", follow.target_user_id)
          .order("created_at", { ascending: false });

        followAvatars = [...followAvatars, ...avatarsData!];
      }

      const sortedAvatars = followAvatars
        .sort((a, b) => {
          if (a.created_at < b.created_at) return 1;
          if (a.created_at > b.created_at) return -1;
          return 0;
        })
        .slice(0, 10);

      for (const avatar of sortedAvatars!) {
        const { data: user } = await supabase
          .from("profiles")
          .select(`*,  tags (tag)`)
          .eq("user_id", avatar.user_id)
          .single();
        if (avatar.thumbnail === null) avatar.thumbnail = "/VerticalModel.png";

        avatarArray.push({
          ...avatar,
          user: user,
        });
      }

      setAvatars(avatarArray);
    }
  };

  const getRecentAvatars = async () => {
    const avatarArray = [];

    const { data: avatarsData, error: avatarsError } = await supabase
      .from("avatars")
      .select("*, tags (*), likes (*)")
      .order("created_at", { ascending: false });

    if (avatarsData) {
      for (const avatar of avatarsData.slice(0, 10)!) {
        const { data: user } = await supabase
          .from("profiles")
          .select(`*,  tags (tag)`)
          .eq("user_id", avatar.user_id!)
          .single();

        if (avatar.thumbnail === null) avatar.thumbnail = "/VerticalModel.png";

        avatarArray.push({
          ...avatar,
          user: user,
        });
      }

      setAvatars(avatarArray);
    }
  };

  useEffect(() => {
    if (searchParams.get("type") === "popular") getPopularAvatars();
    if (searchParams.get("type") === "follow") getFollowAvatars();
    if (searchParams.get("type") === "recent") getRecentAvatars();
  }, [searchParams.get("type")]);

  useEffect(() => {
    let totalPageCount = Math.ceil(avatars.length / 10);

    const pageNumArray: number[] = Array.from(
      { length: totalPageCount },
      (_, i) => i + 1
    );

    const result: number[][] = [];
    for (let i = 0; i < pageNumArray.length; i += 5)
      result.push(pageNumArray.slice(i, i + 5));

    setCurrentPageArray(result[0]);
    setTotalPageArray(result);
  }, [avatars]);

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
    let totalPageCount = Math.ceil(avatars.length / 10);

    if (currentPage === totalPageCount) return;

    if (currentPage % 5 === 0)
      setCurrentPageArray(totalPageArray[currentPage / 5]);

    setCurrentPage(currentPage + 1);
  };

  return (
    <div ref={myRef} className="flex flex-col w-full space-y-[24px]">
      {searchParams.get("type") === "popular" && (
        <div className="flex flex-col space-y-[16px]">
          <p className="text-[20px] font-semibold">인기 업로드</p>
          <p className="text-[#9D9D9D]">
            최근 유저들에게 가장 많은 호응을 얻은 아바타입니다.
          </p>
        </div>
      )}
      {searchParams.get("type") === "follow" && (
        <div className="flex flex-col space-y-[16px]">
          <p className="text-[20px] font-semibold">팔로우</p>
          <p className="text-[#9D9D9D]">
            회원님이 팔로우한 유저들의 최근 아바타입니다.
          </p>
        </div>
      )}
      {searchParams.get("type") === "recent" && (
        <div className="flex flex-col space-y-[16px]">
          <p className="text-[20px] font-semibold">최근 업로드</p>
          <p className="text-[#9D9D9D]">
            moopi 유저들이 최근에 업로드한 아바타입니다.
          </p>
        </div>
      )}
      {avatars.length === 0 ? (
        <div className="flex flex-col justify-center items-center !mt-[120px] space-y-[32px]">
          <Image src={cautionImg} className="w-[100px] h-[100px]" alt="" />
          <div className="flex flex-col items-center space-y-[16px]">
            <p className="text-[18px] font-semibold">
              {searchParams.get("type") === "popular"
                ? "인기 업로드 "
                : searchParams.get("type") === "follow"
                ? "팔로우 업로드 "
                : "최근 업로드 "}
              목록이 없습니다.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid dt:grid-cols-5 ph:grid-cols-4 grid-cols-2 gap-x-[16px] gap-y-[24px]">
            {avatars
              .slice(20 * (currentPage - 1), 20 * currentPage)
              ?.map((avatar: any, index: number) => {
                return <Card avatar={avatar} key={index} />;
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
      )}
    </div>
  );
}
