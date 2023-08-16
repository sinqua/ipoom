import homeImg from "@/app/assets/images/home.svg";
import searchImg from "@/app/assets/images/search.svg";
import messageImg from "@/app/assets/images/message.svg";
import alarmImg from "@/app/assets/images/alram.svg";
import followImg from "@/app/assets/images/follow.svg";
import settingImg from "@/app/assets/images/setting.svg";
import Item from "./menu-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function MenuList() {
  const session = await getServerSession(authOptions);
  const userId = session ? `/${session?.user.id}` : "";

  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg} url={userId}>홈</Item>
      <Item imgSrc={searchImg} url={userId}>검색</Item>
      <Item imgSrc={messageImg} url={userId}>메시지</Item>
      <Item imgSrc={alarmImg} url={userId}>알림</Item>
      <Item imgSrc={followImg} url={userId}>팔로우</Item>
      <Item imgSrc={settingImg} url={`${userId}/edit`}>마이페이지</Item>
    </div>
  );
}
