import homeImg from "@/app/assets/images/home.svg";
import portfolioImg from "@/app/assets/images/portfolio.svg";
import alarmImg from "@/app/assets/images/alram.svg";
import profileImg from "@/app/assets/images/profile.svg";
import followImg from "@/app/assets/images/follow.svg";
import likeImg from "@/app/assets/images/like.svg";
import editImg from "@/app/assets/images/edit.svg";
import logoutImg from "@/app/assets/images/logout.svg";

import Item from "./menu-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function MenuList() {
  const session = await getServerSession(authOptions);
  const userId = session ? `/${session?.user.id}` : "/login";

  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg} url={"/home"}>
        홈
      </Item>
      <Item imgSrc={alarmImg} url={"/home"}>
        알림
      </Item>
      <Item imgSrc={profileImg} url={`${userId}`}>
        프로필
      </Item>
      <Item imgSrc={followImg} url={`${userId}`}>
        팔로우 목록
      </Item>
      <Item imgSrc={likeImg} url={`${userId}`}>
        좋아요 목록
      </Item>
      {session && (
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
