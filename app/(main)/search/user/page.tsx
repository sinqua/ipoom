"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useSearchParams } from "next/navigation";
import User from "@/components/search/user";

export const revalidate = 0;

export default function Page() {
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient<Database>();

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
      // .in("id", indexArray)
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
        userArray.push({
          ...user,
          avatarCount: avatarsData?.length,
        });
        userArray.push({
          ...user,
          avatarCount: avatarsData?.length,
        });
      }
    }

    setUsers(userArray);
  };

  useEffect(() => {
    getSearchResult(searchParams.get("content")!);
  }, [searchParams.get("content")]);

  return (
    <div className="relative flex flex-col items-center w-full grow">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] ph:pt-[40px] pt-[20px] space-y-[64px]">
        <User users={users} setUsers={setUsers} />
      </div>
    </div>
  );
}
