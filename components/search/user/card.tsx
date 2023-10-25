import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/string";
import FollowButton from "./follow-button";
import { useEffect, useState } from "react";
import { getFollowStatus } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface CardProps {
  session: any;
  userData: any;
  index: any;
}

export default function Card({ session, userData, index }: CardProps) {
  const pathname = usePathname();
  const [followStatus, setFollowStatus] = useState<any>(false);

  const getStatus = async () => {
    if (session) {
      const followStatusData = await getFollowStatus(
        session.user.id,
        userData.user_id!
      );

      setFollowStatus(followStatusData);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <Link
      href={`/${userData.user_id}`}
      className={cn(
        "flex space-x-[24px]",
        !pathname.includes("user") && (index < 4 ? "flex" : "ph:flex hidden")
      )}
    >
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
        {session?.user.id !== userData.user_id && (
          <FollowButton
            userId={userData.user_id}
            followStatus={followStatus}
            setFollowStatus={setFollowStatus}
          />
        )}
      </div>
    </Link>
  );
}
