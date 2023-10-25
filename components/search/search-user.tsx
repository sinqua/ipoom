"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import Card from "./user/card";
import Image from "next/image";
import cautionImg from "@/app/assets/images/caution.svg";
import { cn } from "@/lib/utils";

export default function SearchUser() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const [session, setSession] = useState<any>();

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
  };

  const [users, setUsers] = useState<any>([]);

  const getSearchResult = async (content: string) => {
    const userArray = [];

    const { data: userNicknameData } = await supabase
      .from("profiles")
      .select("id")
      .like("nickname", `%${content}%`);

    const { data: userTagData } = await supabase
      .from("tags")
      .select("profile_id")
      .is("avatar_id", null)
      .eq("tag", `${content}`);

    const indexArray1 = userNicknameData?.map((item) => {
      return item.id;
    });

    const indexArray2 = userTagData?.map((item) => {
      return item.profile_id;
    });

    const indexSet = new Set([...indexArray1!, ...indexArray2!]);
    const indexArray = Array.from(indexSet);

    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("*")
      .in("id", indexArray)
      .order("created_at", { ascending: false })
      .limit(8);

    if (userData) {
      for (const user of userData) {
        const { data: avatarsData, error: avatarsError } = await supabase
          .from("avatars")
          .select("*")
          .eq("user_id", user.user_id!);

        userArray.push({
          ...user,
          avatarCount: avatarsData?.length,
        });
      }
    }

    setUsers(userArray);
  };

  useEffect(() => {
    getSession();

    getSearchResult(searchParams.get("content")!);
  }, [searchParams.get("content")]);

  return (
    <div className="flex flex-col w-full mt-[40px] space-y-[24px]">
      <div className="flex justify-between items-center">
        <p className="text-[20px] font-semibold">유저</p>
        <p
          className={cn(
            "text-[#2778C7] font-semibold cursor-pointer",
            users.length === 0 && "hidden"
          )}
          onClick={() =>
            router.push(`/search/user?content=${searchParams.get("content")}`)
          }
        >
          모두 보기
        </p>
      </div>
      {users.length > 0 ? (
        <div className="grid ph:grid-cols-2 grid-cols-1 gap-x-[16px] ph:gap-y-[24px] gap-y-[36px]">
          {users.map((user: any, index: number) => {
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
      ) : (
        <div className="flex flex-col justify-center items-center !mt-[80px] space-y-[32px]">
          <Image src={cautionImg} className="w-[100px] h-[100px]" alt="" />
          <div className="flex flex-col items-center space-y-[16px]">
            <p className="text-[18px] font-semibold">
              '{searchParams.get("content")}'에 대한 검색 결과가 없습니다.
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
