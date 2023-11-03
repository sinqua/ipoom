"use client";
import { getProfile } from "@/lib/supabase";

import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import replyOpenImg from "@/app/assets/images/reply_open.svg";
import replyCloseImg from "@/app/assets/images/reply_close.svg";
import replyMoreImg from "@/app/assets/images/reply_more.svg";

import CommentInfo from "./info";
import Reply from "./reply";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

interface CommentProps {
  userId: any;
  comment: any;
}

export default function Comment({ userId, comment }: CommentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState<any>(null);
  const [replies, setReplies] = useState(comment.replies);

  const [isShowReply, setIsShowReply] = useState(false);
  const [replyCount, setReplyCount] = useState(5);

  useEffect(() => {
    getProfile(comment.writer_id).then((profile: any) => {
      setProfile(profile);
    });
  }, []);

  if (!profile) return <CommentSkeleton />;

  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="flex justify-between items-center">
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
            className="object-cover w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={128}
            height={128}
            alt=""
          />
          <p className="font-semibold text-[18px]">{profile?.nickname}</p>
        </div>
      </div>
      <div className="flex flex-col pl-[56px]">
        <p className="text-[14px] whitespace-pre-line">{comment.content}</p>
        <CommentInfo
          userId={userId}
          comment={comment}
          replies={replies}
          setReplies={setReplies}
          setIsShowReply={setIsShowReply}
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

function CommentSkeleton() {
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
