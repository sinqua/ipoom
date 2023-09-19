"use client";
import { addLike, deleteLike } from "@/lib/supabase";
import { useEffect, useState } from "react";

import Image from "next/image";
import HeartLineImg from "@/app/assets/images/heart_line.svg";
import HeartFillImg from "@/app/assets/images/heart_fill.svg";

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

import { useRouter } from "next/navigation";

interface LikeButtonProps {
  userId: any;
  avatarId: any;
  likes: any;
}

export default function LikeButton({
  userId,
  avatarId,
  likes,
}: LikeButtonProps) {
  const router = useRouter();

  const checkLikeStatus = (): Boolean => {
    if (!userId) return false;

    const result = likes.filter((item: any) => item.user_id === userId);

    if (result.length > 0) return true;
    else return false;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeStatus, setLikeStatus] = useState(checkLikeStatus());

  const onClickLikeButton = async () => {
    if (userId) {
      if (likeStatus) {
        await deleteLike(userId, avatarId);

        setLikeCount(likeCount - 1);
        setLikeStatus(false);
      } else {
        await addLike(userId, avatarId);

        setLikeCount(likeCount + 1);
        setLikeStatus(true);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        className="flex items-center space-x-[8px]"
        onClick={onClickLikeButton}
      >
        <Image
          src={likeStatus ? HeartFillImg : HeartLineImg}
          className="w-[24px] h-[24px] cursor-pointer"
          width={512}
          height={512}
          alt=""
        />
        <p className="font-semibold text-[14px] text-[#FF4E4E]">{likeCount}</p>
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
            <AlertDialogAction onClick={() => router.push("/login")}>
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
