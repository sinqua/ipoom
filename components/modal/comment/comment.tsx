"use client";
import { getCommentProfile } from "@/lib/supabase";

import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import replyOpenImg from "@/app/assets/images/reply_open.svg";
import replyCloseImg from "@/app/assets/images/reply_close.svg";
import replyMoreImg from "@/app/assets/images/reply_more.svg";

import moreImg from "@/app/assets/images/more.svg";
import CommentInfo from "./info";
import Reply from "./reply";
import { useEffect, useState } from "react";

interface CommentProps {
  userId: any;
  comment: any;
}

export default function Comment({ userId, comment }: CommentProps) {
  const [profile, setProfile] = useState<any>(null);

  const [replies, setReplies] = useState(comment.replies);

  const [isShowReply, setIsShowReply] = useState(false);
  const [replyCount, setReplyCount] = useState(5);

  useEffect(() => {
    getCommentProfile(comment.writer_id).then((profile: any) => {
      setProfile(profile);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-[16px] cursor-pointer">
          <Image
            src={profile ? profile.image : emptyImg}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={512}
            height={512}
            alt=""
          />
          <p className="font-semibold text-[18px]">{profile?.nickname}</p>
        </div>
        {/* <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer">
          <Image src={moreImg} className="w-[20px] h-[20px]" alt="" />
        </div> */}
      </div>
      <div className="flex flex-col pl-[56px]">
        <p className="text-[14px] whitespace-pre-line">{comment.content}</p>
        <CommentInfo
          userId={userId}
          comment={comment}
          replies={replies}
          setReplies={setReplies}
        />
        {replies.length > 0 && (
          <div
            className="flex items-center space-x-[8px] mt-[16px] cursor-pointer"
            onClick={() => setIsShowReply(!isShowReply)}
          >
            <Image
              src={isShowReply ? replyCloseImg : replyOpenImg}
              className="w-[10px] h-[10px]"
              width={512}
              height={512}
              alt=""
            />
            <p className="text-[#368ADC] font-semibold">{`${
              isShowReply ? "답글 닫기" : "답글 열기"
            } (${replies.length}개)`}</p>
          </div>
        )}
        {isShowReply && (
          <div className="flex flex-col mt-[24px] space-y-[24px]">
            {replies
              .slice(0)
              .reverse()
              .slice(0, replyCount)
              .map((item: any, index: number) => {
                return <Reply userId={userId} reply={item} key={item.id} />;
              })}
            {replies.length > replyCount && (
              <div
                className="flex items-center space-x-[8px] mt-[16px] pl-[56px] cursor-pointer"
                onClick={() => setReplyCount(replyCount + 5)}
              >
                <Image
                  src={replyMoreImg}
                  className="w-[10px] h-[10px]"
                  width={512}
                  height={512}
                  alt=""
                />
                <p className="text-[#368ADC] font-semibold">더보기</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
