import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/string";
import FollowButton from "./follow-button";

interface CardProps {
  userData: any;
}

export default function Card({ userData }: CardProps) {
  return (
    <Link href={`/${userData.user_id}`} className="flex space-x-[24px]">
      <Image
        src={userData.image}
        className="object-cover shrink-0 ph:w-[160px] w-[120px] ph:h-[160px] h-[120px] rounded-full"
        width={512}
        height={512}
        alt=""
      />
      <div className="flex ph:flex-col flex-row justify-between grow ph:py-[6px] py-[15px]">
        <div className="flex flex-col justify-center">
          <p className="text-[16px] font-semibold">{userData.nickname}</p>
          <div className="flex items-center space-x-[8px] mt-[8px]">
            <p>아바타</p>
            <p className="font-semibold">{userData.avatarCount}</p>
          </div>
          <div className="flex items-center space-x-[8px] mt-[24px] text-[#9D9D9D]">
            <p>가입일</p>
            <p>{formatDate(userData.created_at)}</p>
          </div>
        </div>
        <FollowButton userId={userData.user_id} status={true} />
      </div>
    </Link>
  );
}
