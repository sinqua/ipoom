import { cookies } from "next/headers";
import Card from "./card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Recent() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const avatars = [];

  const { data: avatarsData, error: avatarsError } = await supabase
    .from("avatars")
    .select("*, tags (*), likes (*)")
    .order("created_at", { ascending: false });

  if (avatarsData) {
    for (const avatar of avatarsData.slice(0, 10)!) {
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
          <p className="text-[20px] font-semibold">최근 업로드</p>
          <p className="text-[#2778C7] font-semibold cursor-pointer">
            모두 보기
          </p>
        </div>
        <p className="text-[#9D9D9D]">
          moopi 유저들이 최근에 업로드한 아바타입니다.
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
