import Image from "next/image";
import tempImg from "@/public/VerticalModel.png";

export default function Work({ avatar }: { avatar: any }) {
  return (
    <div className="relative w-full dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden cursor-pointer">
      <Image src={avatar.thumbnailUrl} width={512} height={512} className="object-cover w-full h-full" alt="" />
      <div className="absolute bottom-0 flex flex-col justify-between items-center w-full h-[61px] p-[8px] bg-black/20 backdrop-blur-[3px] text-[#FFFFFF]">
        <div className="flex justify-between w-full">
          <p>{avatar.name}</p>
          <p>1주 전</p>
        </div>
        <div className="w-full">
          <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
            {avatar.tags.map((item: any, index: any) => {
              return index === 0 ? `#${item.tag}` : <>&nbsp;&nbsp;#{item.tag}</>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
