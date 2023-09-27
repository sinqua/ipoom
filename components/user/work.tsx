import Image from "next/image";
import Link from "next/link";
import Cover from "./cover";
import { getTimeAgo } from "@/lib/utils";

export default function Work({ user, avatar }: { user: any; avatar: any }) {
  return (
    <div className="relative w-auto dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden">
      <div className="relative w-full h-full cursor-pointer rounded-[8px] overflow-hidden">
        <Link href={`/${user}/avatar/${avatar.id}`}>
          <Image
            src={avatar.thumbnail}
            width={512}
            height={512}
            className="object-cover w-full h-full hover:scale-110 duration-200"
            alt=""
          />
        </Link>
        <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF] pointer-events-none">
          <div className="flex justify-between items-center w-full">
            <p className="text-[16px] font-semibold">{avatar.name}</p>
            <p className="text-[12px]">{getTimeAgo(avatar.created_at)}</p>
          </div>
          <div className="w-full">
            <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
              {avatar.tags.map((item: any, index: any) => {
                return index === 0
                  ? `#${item.tag}`
                  : `\u00A0\u00A0#${item.tag}`;
              })}
            </p>
          </div>
        </div>
      </div>
      <Cover avatar={avatar.id} status={avatar.optimized} />
    </div>
  );
}
