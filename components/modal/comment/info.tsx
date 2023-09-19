"use client";
import { addComment, addReply, getCommentProfile } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import moreImg from "@/app/assets/images/more.svg";

interface CommentInfoProps {
  userId: any;
  comment: any;
}

export default function CommentInfo({ userId, comment }: CommentInfoProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [showInput, setShowInput] = useState(false);

  const today = new Date();
  const createdDate = new Date(comment.created_at);

  const betweenTime = Math.floor(
    (today.getTime() - createdDate.getTime()) / 1000 / 60
  );
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);

  const handleTextareaSizeChange = () => {
    const textarea = inputRef.current;
    textarea!.style.height = "auto"; // 높이를 초기화합니다
    textarea!.style.height = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
  };

  const onClickReplyButton = async () => {
    if (userId) {
      await addReply(userId, comment.id, inputRef.current!.value);

      setShowInput(false);
    } else {
      console.log("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <div className="flex flex-col mt-[16px] space-y-[24px]">
      <div className="flex space-x-[16px]">
        <p className="text-[14px] text-[#CCCCCC]">
          {betweenTimeWeek > 0
            ? `${betweenTimeWeek}주 전`
            : today.getDate() === createdDate.getDate()
            ? "오늘"
            : betweenTimeDay === 0
            ? "1일 전"
            : `${betweenTimeDay}일 전`}
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
  );
}
