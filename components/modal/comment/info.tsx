"use client";
import { addReply } from "@/lib/supabase";
import { useRef, useState } from "react";

import { getTimeAgo } from "@/lib/utils";

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

interface CommentInfoProps {
  userId: any;
  comment: any;
  replies: any;
  setReplies: any;
  setIsShowReply: any;
}

export default function CommentInfo({
  userId,
  comment,
  replies,
  setReplies,
  setIsShowReply
}: CommentInfoProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handleTextareaSizeChange = () => {
    const textarea = inputRef.current;
    textarea!.style.height = "auto"; // 높이를 초기화합니다
    textarea!.style.height = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
  };

  const onClickReplyButton = async () => {
    if (!userId) {
      setIsOpen(true);
      return;
    }

    const result = await addReply(userId, comment.id, inputRef.current!.value);
    setReplies([...replies, result]);
    setShowInput(false);
    setIsShowReply(true);
  };

  return (
    <>
      <div className="flex flex-col mt-[16px] space-y-[24px]">
        <div className="flex space-x-[16px]">
          <p className="text-[14px] text-[#CCCCCC]">
            {getTimeAgo(comment.created_at)}
          </p>
          <p
            className="text-[14px] text-[#CCCCCC] hover:text-[#333333] cursor-pointer"
            onClick={() => setShowInput(!showInput)}
          >
            답글달기
          </p>
        </div>
        {showInput && (
          <div className="left-0 flex flex-col items-end space-y-[20px] h-auto p-[16px] bg-[#FFFFFF] rounded-[8px] border-[1px] border-[#D4D4D4]">
            <textarea
              ref={inputRef}
              className="flex items-center w-full !p-0 resize-none text-[14px] bg-white border-none focus:ring-0 overflow-hidden"
              placeholder="# 댓글에 답글을 남겨주세요."
              onChange={handleTextareaSizeChange}
            />
            <div
              className="flex justify-center items-center w-[60px] h-[40px] bg-[#368ADC] rounded-[10px] text-[#FFFFFF] cursor-pointer"
              onClick={onClickReplyButton}
            >
              게시
            </div>
          </div>
        )}
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
