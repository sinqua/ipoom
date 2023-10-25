"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import cautionImg from "@/app/assets/images/caution.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import Card from "./avatar/card";
import { cn } from "@/lib/utils";

export default function SearchAvatar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const [avatars, setAvatars] = useState<any>([]);

  const getSearchResult = async (content: string) => {
    const avatarArray = [];

    const { data: avatarNameData } = await supabase
      .from("avatars")
      .select("id")
      .like("name", `%${content}%`);

    const { data: avatarTagData } = await supabase
      .from("tags")
      .select("avatar_id")
      .is("profile_id", null)
      .eq("tag", `${content}`);

    const indexArray1 = avatarNameData?.map((item) => {
      return item.id;
    });

    const indexArray2 = avatarTagData?.map((item) => {
      return item.avatar_id;
    });

    const indexSet = new Set([...indexArray1!, ...indexArray2!]);
    const indexArray = Array.from(indexSet);

    const { data: avatarsData, error: avatarsError } = await supabase
      .from("avatars")
      .select("*, tags (*), likes (*)")
      .in("id", indexArray)
      .order("created_at", { ascending: false })
      .limit(10);

    if (avatarsData) {
      for (const avatar of avatarsData.slice(0, 10)!) {
        const { data: user } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("user_id", avatar.user_id!)
          .single();

        if (avatar.thumbnail === null) avatar.thumbnail = "/VerticalModel.png";

        const newAvatar: any = {
          ...avatar,
          user: user,
        };
        avatarArray.push(newAvatar);
      }

      setAvatars(avatarArray);
    }
  };

  useEffect(() => {
    getSearchResult(searchParams.get("content")!);
  }, [searchParams.get("content")]);

  return (
    <div className="flex flex-col w-full mt-[40px] space-y-[24px]">
      <div className="flex justify-between items-center">
        <p className="text-[20px] font-semibold">아바타</p>
        <p
          className={cn(
            "text-[#2778C7] font-semibold cursor-pointer",
            avatars.length === 0 && "hidden"
          )}
          onClick={() =>
            router.push(`/search/avatar?content=${searchParams.get("content")}`)
          }
        >
          모두 보기
        </p>
      </div>
      {avatars.length > 0 ? (
        <div className="grid dt:grid-cols-5 ph:grid-cols-4 grid-cols-2 gap-x-[16px] gap-y-[24px]">
          {avatars.map((avatar: any, index: number) => {
            return <Card index={index} avatar={avatar} key={index} />;
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
