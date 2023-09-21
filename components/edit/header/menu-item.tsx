"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Item({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const url = `/${pathname.split("/")[1]}/${links[children!.toString()]}`;

  return (
    <Link
      href={url}
      className={`${
        checkUrl(children, pathname)
          ? "text-[#333333]"
          : "text-[#9D9D9D] hover:text-[#333333]"
      } flex flex-col justify-between ph:h-[35px] h-[30px] cursor-pointer`}
    >
      <p className="ph:text-[18px] text-[16px]">{children}</p>
      <div
        className={`${
          checkUrl(children, pathname) ? "block" : "hidden"
        } w-full h-[2px] bg-[#333333]`}
      ></div>
    </Link>
  );
}

type menuMap = {
  [key: string]: any;
};

const menus: menuMap = {
  프로필카드: undefined,
  "커미션 안내": "description",
  작업: "portfolio",
  "비용 안내": "price-info",
};

const links: menuMap = {
  프로필카드: "edit",
  "커미션 안내": "edit/description",
  작업: "edit/portfolio",
  "비용 안내": "edit/price-info",
};

const checkUrl = (children: React.ReactNode, pathname: string) => {
  if (menus[children!.toString()] === pathname.split("/")[3]) return true;
  else return false;
};
