import homeImg from "@/app/assets/images2/home.svg";
import searchImg from "@/app/assets/images2/search.svg";
import messageImg from "@/app/assets/images2/message.svg";
import alarmImg from "@/app/assets/images2/alram.svg";
import followImg from "@/app/assets/images2/follow.svg";
import settingImg from "@/app/assets/images2/setting.svg";
import Item from "./menu-item";

export default function MenuList() {
  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg}>홈</Item>
      <Item imgSrc={searchImg}>검색</Item>
      <Item imgSrc={messageImg}>메시지</Item>
      <Item imgSrc={alarmImg}>알림</Item>
      <Item imgSrc={followImg}>팔로우</Item>
      <Item imgSrc={settingImg}>설정</Item>
    </div>
  );
}
