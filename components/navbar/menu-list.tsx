import homeImg from "@/app/assets/images/home.svg";
import portfolioImg from "@/app/assets/images/portfolio.svg";
import alarmImg from "@/app/assets/images/alram.svg";
import profileImg from "@/app/assets/images/profile.svg";
import followImg from "@/app/assets/images/follow.svg";
import likeImg from "@/app/assets/images/like.svg";
import editImg from "@/app/assets/images/edit.svg";
import logoutImg from "@/app/assets/images/logout.svg";

import Item from "./menu-item";
import LogoutButton from "./logout-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import AlarmItem from "./menu-alarm-item";

export default async function MenuList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user ? `/${user.id}` : "/login";

  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg} url={"/home"}>
        홈
      </Item>
      <AlarmItem imgSrc={alarmImg}>
        알림
      </AlarmItem>
      <Item imgSrc={profileImg} url={`${userId}`}>
        프로필
      </Item>
      <Item imgSrc={followImg} url={`${userId}/follow`}>
        팔로우 목록
      </Item>
      <Item imgSrc={likeImg} url={`${userId}/likes`}>
        좋아요 목록
      </Item>
      {userId !== "/login" && (
        <>
          <Item imgSrc={editImg} url={`${userId}/edit`}>
            프로필 수정
          </Item>
          <LogoutButton imgSrc={logoutImg} />
        </>
      )}
    </div>
  );
}
