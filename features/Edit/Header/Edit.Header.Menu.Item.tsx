"use client";
import { usePathname } from "next/navigation";

type menuMap = {
  [key: string]: any;
};

const menus: menuMap = {
  '프로필 카드': undefined,
  '대표 아바타': "main-avatar",
  '설명': "description",
  '포트폴리오': "portfolio",
  '가격정보': "price-info",
  '결제수단': "payment",
};

export default function Item({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={`${
        checkUrl(children, pathname) ? "text-[#333333]" : "text-[#9D9D9D]"
      } flex flex-col justify-between h-full  cursor-pointer`}
    >
      <p>{children}</p>{" "}
      <div
        className={`${
          checkUrl(children, pathname) ? "block" : "hidden"
        } w-full h-[2px] bg-[#333333]`}
      ></div>
    </div>
  );
}

const checkUrl = (children: React.ReactNode, pathname: string) => {
  if (menus[children!.toString()] === pathname.split("/")[3]) return true;
  else return false;
};
