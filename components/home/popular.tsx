import { cookies } from "next/headers";
import Card from "./card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function Popular() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const avatars = [];

  const { data: avatarsData, error: avatarsError } = await supabase
    .from("avatars")
    .select("*, tags (*), likes (*)")
    .eq("optimized", true)
    .order("created_at", { ascending: false });

  if (avatarsData) {
    const sortedAvatars = avatarsData
      .sort((a, b) => {
        if (a.likes.length < b.likes.length) return 1;
        if (a.likes.length > b.likes.length) return -1;
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

      const newAvatar: any = {
        ...avatar,
        user: user,
      };
      avatars.push(newAvatar);
    }
  }

  return (
    <div className="flex flex-col w-full space-y-[24px]">
      <div className="flex flex-col space-y-[16px]">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-semibold">인기 업로드</p>
          <Link
            href={"/list?type=popular"}
            className="text-[14px] text-[#2778C7] font-semibold cursor-pointer"
          >
            모두 보기
          </Link>
        </div>
        <p className="text-[#9D9D9D]">
          최근 유저들에게 가장 많은 호응을 얻은 아바타입니다.
        </p>
      </div>
      <div className="grid dt:grid-cols-5 tb:grid-cols-4 grid-cols-2 gap-x-[16px] gap-y-[24px]">
        {avatars.slice(0, 10).map((avatar: any, index: number) => {
          return <Card index={index} avatar={avatar} key={index} />;
        })}
      </div>
    </div>
  );
}
