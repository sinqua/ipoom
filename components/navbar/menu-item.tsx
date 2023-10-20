import Image from "next/image";
import Link from "next/link";

export default function Item({
  children,
  imgSrc,
  url,
}: {
  children: React.ReactNode;
  imgSrc: string;
  url: string;
}) {
  console.log("link item nav");
  return (
    <Link href={url} prefetch={false}>
      <div className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer">
        <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
        <p className="text-[16px]">{children}</p>
      </div>
    </Link>
  );
}
