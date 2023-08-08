import Image from "next/image";
import Link from "next/link";

export default function Item(props: any) {
  return (
    <Link
      href={"/"}
      className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
    >
      <Image src={props.icon} className="w-[24px] h-[24px]" alt="" priority />
      <p className="text-[16px]">{props.title}</p>
    </Link>
  );
}
