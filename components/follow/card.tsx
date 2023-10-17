import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/string";
import FollowButton from "./follow-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface CardProps {
  index: number;
  userData: any;
}

export default async function Card({ index, userData }: CardProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Link href={`/${userData.user_id}`} className="flex space-x-[24px]">
      <Image
        src={userData.image}
        className="object-cover w-[160px] h-[160px] rounded-full"
        width={512}
        height={512}
        alt=""
      />
      <div className="flex flex-col justify-between py-[6px]">
        <p className="text-[16px] font-semibold">{userData.nickname}</p>
        <div className="flex items-center space-x-[8px] mt-[8px]">
          <p>아바타</p>
          <p className="font-semibold">{userData.avatarCount}</p>
        </div>
        <div className="flex items-center space-x-[8px] mt-[24px] text-[#9D9D9D]">
          <p>가입일</p>
          <p>{formatDate(userData.created_at)}</p>
        </div>
        <FollowButton
          sessionId={user?.id}
          userId={userData.user_id}
          status={true}
        />
      </div>
    </Link>
  );
}
