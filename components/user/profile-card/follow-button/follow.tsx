"use client";
import Image from "next/image";
import followImg from "@/app/assets/images/follow_white.svg";
import { addFollow } from "@/lib/supabase";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface FollowProps {
  sessionId: string | undefined;
  userId: string;
  setFollowStatus: any;
}

export default function Follow({
  sessionId,
  userId,
  setFollowStatus,
}: FollowProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const onClickFollowButton = async (sessionId: string, userId: string) => {
    if (!sessionId) {
      setIsOpen(true);
      return;
    }

    const result = await addFollow(sessionId, userId);
    setFollowStatus(result);
  };

  return (
    <>
      <div
        className="flex grow justify-center items-center h-[42px] space-x-[16px] bg-[#368ADC] hover:bg-[#5EA1E3] rounded-[10px] cursor-pointer"
        onClick={() => onClickFollowButton(sessionId!, userId)}
      >
        <Image
          src={followImg}
          width={512}
          height={512}
          className="w-[20px] h-[20px]"
          alt=""
        />
        <p className="text-[14px] text-[#FFFFFF]">팔로우</p>
      </div>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요한 서비스입니다.</AlertDialogTitle>
            <AlertDialogDescription>
              로그인 페이지로 이동합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Separator />
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push(`/login?callbackUrl=${pathname}`)}
            >
              이동
            </AlertDialogAction>
            <Separator orientation="vertical" />
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              취소
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
