import homeImg from "@/app/assets/images/home.svg";
import portfolioImg from "@/app/assets/images/portfolio.svg";
import mypageImg from "@/app/assets/images/mypage.svg";
import logoutImg from "@/app/assets/images/logout.svg";

import Item from "./menu-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function MenuList() {
  const session = await getServerSession(authOptions);
  const userId = session ? `/${session?.user.id}` : "";

  return (
    <div className="grow flex flex-col">
      <Item imgSrc={homeImg} url={"/"}>
        홈
      </Item>
      <Item imgSrc={portfolioImg} url={`${userId}`}>
        포트폴리오
      </Item>
      <Item imgSrc={mypageImg} url={`${userId}/edit`}>
        마이페이지
      </Item>
      <LogoutButton imgSrc={logoutImg} />
    </div>
  );
}
