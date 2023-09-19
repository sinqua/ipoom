"use client";

import { addComment } from "@/lib/supabase";
import { Suspense, useEffect, useRef, useState } from "react";
import Comment from "./comment/comment";

interface CommenSectiontProps {
  userId: any;
  avatarId: any;
  comments: any;
}

export default function CommentSection({
  userId,
  avatarId,
  comments,
}: CommenSectiontProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [data, setData] = useState<any>(comments);

  // 모달 렌더링 시, Textarea 높이 초기화
  useEffect(() => {
    setDefaultTextareaSize();
  }, []);

  const setDefaultTextareaSize = () => {
    const textarea = inputRef.current;
    textarea!.style.height = "auto"; // 높이를 초기화합니다
    textarea!.style.minHeight = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
  };

  const handleTextareaSizeChange = () => {
    const textarea = inputRef.current;
    textarea!.style.height = "auto"; // 높이를 초기화합니다
    textarea!.style.height = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
  };

  const onClickCommentButton = async () => {
    if (userId) {
      const result = await addComment(
        userId,
        avatarId,
        inputRef.current!.value
      );

      setData([...data, result]);

      inputRef.current!.value = "";
    } else {
      console.log("로그인이 필요한 기능입니다.");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {data.map((item: any, index: number) => {
          return index === 0 ? (
            <Comment userId={userId} comment={item} key={item.id} />
          ) : (
            <div className="flex flex-col" key={item.id}>
              <div className="w-full h-[1px] bg-[#D4D4D4] mt-[24px] mb-[24px]"></div>
              <Comment userId={userId} comment={item} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-end space-y-[40px] h-auto p-[16px] bg-[#FFFFFF] rounded-[8px] border-[1px] border-[#D4D4D4]">
        <textarea
          ref={inputRef}
          className="flex items-center w-full !p-0 resize-none text-[14px] bg-white border-none focus:ring-0 overflow-hidden"
          placeholder="# 아바타를 보고 느끼신 점을 적어주세요.&#13;&#10;# 지나친 비방이나 공격적인 언어표현은 제제의 대상이 될 수 있습니다."
          onChange={handleTextareaSizeChange}
        />
        <div
          className="flex justify-center items-center w-[60px] h-[40px] bg-[#368ADC] rounded-[10px] text-[#FFFFFF] cursor-pointer"
          onClick={onClickCommentButton}
        >
          게시
        </div>
      </div>
    </>
  );
}
