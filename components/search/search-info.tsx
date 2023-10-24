"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function SearchInfo() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const supabase = createClientComponentClient<Database>();

  const [count, setCount] = useState(0);

  const getSearchResultCount = async (content: string) => {
    const { data: avatarNameData } = await supabase
      .from("avatars")
      .select("id")
      .like("name", `%${content}%`);

    const { data: avatarTagData } = await supabase
      .from("tags")
      .select("avatar_id")
      .is("profile_id", null)
      .eq("tag", `${content}`);

    const { data: userNicknameData } = await supabase
      .from("profiles")
      .select("id")
      .like("nickname", `%${content}%`);

    const { data: userTagData } = await supabase
      .from("tags")
      .select("profile_id")
      .is("avatar_id", null)
      .eq("tag", `${content}`);

    const avatarIndexArray1 = avatarNameData?.map((item) => {
      return item.id;
    });
    const avatarIndexArray2 = avatarTagData?.map((item) => {
      return item.avatar_id;
    });
    const userIndexArray1 = userNicknameData?.map((item) => {
      return item.id;
    });
    const userIndexArray2 = userTagData?.map((item) => {
      return item.profile_id;
    });

    const avatarIndexSet = new Set([
      ...avatarIndexArray1!,
      ...avatarIndexArray2!,
    ]);
    const userIndexSet = new Set([...userIndexArray1!, ...userIndexArray2!]);

    const avatarIndexArray = Array.from(avatarIndexSet);
    const userIndexArray = Array.from(userIndexSet);

    setCount((pathname.includes("user") ? 0 : avatarIndexArray.length) + (pathname.includes("avatar") ? 0 : userIndexArray.length));
  };

  useEffect(() => {
    getSearchResultCount(searchParams.get("content")!);
  }, [pathname, searchParams.get("content")]);

  return (
    <div className="flex flex-col items-center w-full space-y-[8px]">
      <p className="text-[20px] font-semibold">{searchParams.get("content")}</p>
      <p className="text-[#9D9D9D]">{`${count.toLocaleString()}개의 결과`}</p>
    </div>
  );
}
