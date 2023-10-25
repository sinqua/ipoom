import { cookies } from "next/headers";
import Card from "./card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function Follow() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatars = [];

  const { data: followsData, error: followsError } = await supabase
    .from("follows")
    .select("*")
    .eq("source_user_id", user?.id);

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
          <p className="text-[20px] font-semibold">팔로우</p>
          <Link
            href={"/list?type=follow"}
            className="text-[14px] text-[#2778C7] font-semibold cursor-pointer"
          >
            모두 보기
          </Link>
        </div>
        <p className="text-[#9D9D9D]">
          회원님이 팔로우한 유저들의 최근 아바타입니다.
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
