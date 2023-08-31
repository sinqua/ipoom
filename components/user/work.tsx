import Image from "next/image";
import Link from "next/link";
import Cover from "./cover";

export default function Work({ user, avatar }: { user: any; avatar: any }) {
  const today = new Date();
  const createdDate = new Date(avatar.created_at);

  const betweenTime = Math.floor(
    (today.getTime() - createdDate.getTime()) / 1000 / 60
  );
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);

  console.log("avatar", avatar);

  return (
    <div className="relative w-full dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden">
      <Link
        href={`/${user}/avatar/${avatar.id}`}
        className="relative w-full h-full cursor-pointer rounded-[8px] overflow-hidden"
      >
        <Image
          src={avatar.thumbnailUrl}
          width={512}
          height={512}
          className="object-cover w-full h-full"
          alt=""
        />
        <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
          <div className="flex justify-between items-center w-full">
            <p className="text-[16px] font-semibold">{avatar.name}</p>
            <p className="text-[12px]">
              {betweenTimeWeek > 0
                ? `${betweenTimeWeek}주 전`
                : today.getDate() === createdDate.getDate()
                ? "오늘"
                : betweenTimeDay === 0
                ? "1일 전"
                : `${betweenTimeDay}일 전`}
            </p>
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
      </Link>
      {!avatar.optimized && (
        <Cover />
      )}
    </div>
  );
}
