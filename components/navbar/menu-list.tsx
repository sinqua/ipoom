import homeImg from "@/app/assets/images/home.svg";
import reviewImg from "@/app/assets/images/review.svg";
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
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg} url={"/home"}>
        홈
      </Item>
      <Item imgSrc={reviewImg} url={"/contest"}>
        컨테스트
      </Item>
      {session && <AlarmItem imgSrc={alarmImg}>알림</AlarmItem>}
      <Item imgSrc={profileImg} url={`/${session?.user.id}`}>
        프로필
      </Item>
      <Item imgSrc={followImg} url={`/${session?.user.id}/follow`}>
        팔로우 목록
      </Item>
      <Item imgSrc={likeImg} url={`/${session?.user.id}/likes`}>
        좋아요 목록
      </Item>
      {session && (
        <>
          <Item imgSrc={editImg} url={`/${session?.user.id}/edit`}>
            프로필 수정
          </Item>
          <LogoutButton imgSrc={logoutImg} />
        </>
      )}
    </div>
  );
}
