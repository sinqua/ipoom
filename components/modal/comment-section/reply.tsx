"use client";
import { getProfile } from "@/lib/supabase";
import { useEffect, useState } from "react";

import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";

import { getTimeAgo } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

interface ReplyProps {
  userId: any;
  reply: any;
}

export default function Reply({ userId, reply }: ReplyProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile(reply.writer_id).then((profile: any) => {
      setProfile(profile);
    });
  }, []);

  if (!profile) return <ReplySkeleton />;

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between">
        <div
          className="flex items-center space-x-[16px] cursor-pointer"
          onClick={() => {
            pathname.includes(profile?.user_id)
              ? router.back()
              : router.push(`/${profile?.user_id}`);
          }}
        >
          <Image
            src={profile ? profile.image : emptyImg}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={512}
            height={512}
            alt=""
          />
          <p className="font-semibold text-[18px]">{profile?.nickname}</p>
        </div>
      </div>
      <div className="flex flex-col pl-[56px] space-y-[16px]">
        <p className="text-[14px] whitespace-pre-line">{reply.content}</p>
        <p className="text-[14px] text-[#CCCCCC]">
          {getTimeAgo(reply.created_at)}
        </p>
      </div>
    </div>
  );
}

function ReplySkeleton() {
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-[16px]">
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          <Skeleton className="w-[100px] h-[15px] " />
        </div>
      </div>
      <div className="flex flex-col pl-[56px] space-y-[16px]">
        <Skeleton className="w-full h-[12px]" />
        <Skeleton className="w-[50px] h-[12px]" />
      </div>
    </div>
  );
}
