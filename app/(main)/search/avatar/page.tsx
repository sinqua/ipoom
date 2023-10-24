"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useSearchParams } from "next/navigation";
import Avatar from "@/components/search/avatar";
export const revalidate = 0;

export default function Page() {
  const searchParams = useSearchParams();
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
      .order("created_at", { ascending: false });

    if (avatarsData) {
      for (const avatar of avatarsData) {
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
    <div className="relative flex flex-col items-center w-full grow">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] px:pt-[60px] pt-[40px] space-y-[64px]">
        <Avatar avatars={avatars} setAvatars={setAvatars} />
      </div>
    </div>
  );
}
