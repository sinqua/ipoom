"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Item({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const url = `/${pathname.split("/")[1]}/${links[children!.toString()]}`

  return (
    <Link
      href={url}
      className={`${
        checkUrl(children, pathname) ? "text-[#333333]" : "text-[#9D9D9D]"
      } flex flex-col justify-between h-[32px] cursor-pointer`}
    >
      <p>{children}</p>
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
  '소개': 'intro',
  '아바타': undefined,
  '커미션 안내': 'description',
  '비용 안내': 'price-info',
};

const links: menuMap = {
  '소개': 'intro',
  '아바타': '',
  '커미션 안내': 'description',
  '비용 안내': 'price-info',
};

const checkUrl = (children: React.ReactNode, pathname: string) => {
  if (menus[children!.toString()] === pathname.split("/")[2]) return true;
  else return false;
};
