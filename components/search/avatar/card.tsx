"use client";
import { cn, getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import LikeButton from "./like-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CardProps {
  index: number;
  avatar: any;
}

export default function Card({ index, avatar }: CardProps) {
  const pathname = usePathname();

  return (
    <Link
      href={`/avatar/${avatar.id}`}
      className={cn(
        "w-full rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] overflow-hidden cursor-pointer",
        !pathname.includes("avatar") &&  (index < 4 ? "block" : index < 8 ? "tb:block hidden" : "dt:block hidden")
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          draggable={false}
          src={avatar.thumbnail}
          className="object-cover w-full aspect-square hover:scale-110 duration-200"
          width={512}
          height={512}
          alt=""
        />
        <LikeButton likes={avatar.likes} />
      </div>
      <div className="flex flex-col h-max space-y-[8px] p-[8px]">
        <div className="flex justify-between items-center">
          <p className="text-[16px] font-semibold">{avatar.name}</p>
          <p className="text-[12px]">{getTimeAgo(avatar.created_at)}</p>
        </div>
        <div className="w-full pr-[15px]">
          <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
            {avatar.tags.length > 0
              ? avatar.tags.map((item: any, index: any) => {
                  return index === 0
                    ? `#${item.tag}`
                    : `\u00A0\u00A0#${item.tag}`;
                })
              : `\u00A0`}
          </p>
        </div>
        <div className="flex items-center space-x-[8px]">
          <Image
            draggable={false}
            src={avatar.user.image}
            className="w-[20px] h-[20px] rounded-full"
            width={512}
            height={512}
            alt=""
          />
          <p className="text-[12px] font-semibold">{avatar.user.nickname}</p>
        </div>
      </div>
    </Link>
  );
}
