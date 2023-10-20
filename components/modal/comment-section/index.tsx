"use client";
import { addComment } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import Comment from "./comment";
import Image from "next/image";
import DownImg from "@/app/assets/images/down.svg";
import { Separator } from "@/components/ui/separator";
import AlertLogin from "../../alert-login";

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
  const commentTopRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(comments);
  const [commentCount, setCommentCount] = useState(5);

  // 모달 렌더링 시, Textarea 높이 초기화
  useEffect(() => {
    const setDefaultTextareaSize = () => {
      const textarea = inputRef.current;
      textarea!.style.height = "auto"; // 높이를 초기화합니다
      textarea!.style.minHeight = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
    };

    setDefaultTextareaSize();
  }, []);

  const scrollToTop = () => {
    commentTopRef.current?.scrollIntoView({
      block: "center",
    });
  };

  const handleTextareaSizeChange = () => {
    const textarea = inputRef.current;
    textarea!.style.height = "auto"; // 높이를 초기화합니다
    textarea!.style.height = `${textarea!.scrollHeight}px`; // 스크롤 높이에 따라 높이를 설정합니다
  };

  const onClickCommentButton = async () => {
    if (!userId) {
      setIsOpen(true);
      return;
    }

    const result = await addComment(userId, avatarId, inputRef.current!.value);
    setData([...data, result]);

    inputRef.current!.value = "";

    scrollToTop();
  };

  return (
    <>
      <div className="flex flex-col space-y-[24px]">
        <p
          className="text-[16px] font-semibold text-[#9D9D9D]"
          ref={commentTopRef}
        >
          댓글
        </p>
        <div className="flex flex-col">
          {data
            .slice(0)
            .reverse()
            .slice(0, commentCount)
            .map((item: any, index: number) => {
              return index === 0 ? (
                <Comment userId={userId} comment={item} key={item.id} />
              ) : (
                <div key={item.id}>
                  <Separator className="my-[24px]" />
                  <Comment userId={userId} comment={item} />
                </div>
              );
            })}
          {data.length > commentCount && (
            <div className="flex justify-center mt-[24px]">
              <div
                className="flex justify-center items-center w-fit space-x-[8px] px-[16px] py-[11px] bg-[#FFFFFF] hover:bg-[#F6F6F6] border-[1px] border-[#D4D4D4] rounded-[8px] cursor-pointer"
                onClick={() => setCommentCount(commentCount + 5)}
              >
                <p>더보기</p>
                <Image
                  src={DownImg}
                  className="w-[16px] h-[16px]"
                  width={512}
                  height={512}
                  alt=""
                />
              </div>
            </div>
          )}
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
      </div>
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
