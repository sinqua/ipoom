"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type menuMap = {
  [key: string]: any;
};

const menus: menuMap = {
  '작업': undefined,
  '커미션 안내': 'description',
  '비용 안내': 'price-info',
};

const links: menuMap = {
  '작업': '',
  '커미션 안내': 'description',
  '비용 안내': 'price-info',
};

export default function Item({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const url = `/${pathname.split("/")[1]}/${links[children!.toString()]}`

  return (
    <Link
      href={url}
      className={`${
        checkUrl(children, pathname) ? "text-[#333333]" : "text-[#9D9D9D]"
      } flex flex-col justify-between h-[35px] cursor-pointer`}
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

const checkUrl = (children: React.ReactNode, pathname: string) => {
  if (menus[children!.toString()] === pathname.split("/")[2]) return true;
  else return false;
};
