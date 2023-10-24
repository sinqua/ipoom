"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import emptyImg from "@/app/assets/images/empty.png";
import moopiImg from "@/app/assets/logos/moopi_small.png";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cn, getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface AlertAlarmProps {
  isOpen: boolean;
  setIsOpen: any;
  alarms: any;
  setAlarms: any;
}

export default function AlertAlarm({
  isOpen,
  setIsOpen,
  alarms,
  setAlarms,
}: AlertAlarmProps) {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const clickCommentAlarm = async (alarm: any) => {
    await supabase
      .from("alarm_comments")
      .update({ is_read: true })
      .eq("id", alarm.id);

    setIsOpen(false);
    router.push(`/avatar/${alarm.avatar_id}`);
  };

  const clickReplyAlarm = async (alarm: any) => {
    await supabase
      .from("alarm_replies")
      .update({ is_read: true })
      .eq("id", alarm.id);

    setIsOpen(false);
    router.push(`/avatar/${alarm.avatar_id}`);
  };

  const clickFollowAlarm = async (alarm: any) => {
    await supabase
      .from("alarm_follows")
      .update({ is_read: true })
      .eq("id", alarm.id);

    setIsOpen(false);
    router.push(`/${alarm.source_user_id}`);
  };

  const clickLikeAlarm = async (alarm: any) => {
    await supabase
      .from("alarm_likes")
      .update({ is_read: true })
      .eq("id", alarm.id);

    setIsOpen(false);
    router.push(`/avatar/${alarm.avatar_id}`);
  };

  const clickNoticeAlarm = async (alarm: any) => {
    await supabase
      .from("alarm_notices")
      .update({ is_read: true })
      .eq("id", alarm.id);

    setIsOpen(false);
  };

  const clickAlarm = (alarm: any) => {
    if (Object.keys(alarm).includes("comment_id"))
      return clickCommentAlarm(alarm);

    if (Object.keys(alarm).includes("reply_id")) return clickReplyAlarm(alarm);

    if (Object.keys(alarm).includes("follow_id"))
      return clickFollowAlarm(alarm);

    if (Object.keys(alarm).includes("like_id")) return clickLikeAlarm(alarm);

    if (Object.keys(alarm).includes("notice_id"))
      return clickNoticeAlarm(alarm);
  };

  const clickMarkAllAsRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("alarm_comments")
      .update({ is_read: true })
      .eq("target_user_id", user?.id);
    await supabase
      .from("alarm_replies")
      .update({ is_read: true })
      .eq("target_user_id", user?.id);
    await supabase
      .from("alarm_follows")
      .update({ is_read: true })
      .eq("target_user_id", user?.id);
    await supabase
      .from("alarm_likes")
      .update({ is_read: true })
      .eq("target_user_id", user?.id);
    await supabase
      .from("alarm_notices")
      .update({ is_read: true })
      .eq("user_id", user?.id);

    const newAlarms = [];

    for (const alarm of alarms) {
      alarm.is_read = true;
      newAlarms.push(alarm);
    }

    setAlarms(newAlarms);
  };

  const createAlarmText = (alarm: any) => {
    if (Object.keys(alarm).includes("comment_id")) {
      return (
        <p className="whitespace-pre-line leading-[23px]">
          <span className="font-semibold">{alarm.user.nickname}</span>
          &nbsp;님이 회원님의 아바타에 댓글을 달았습니다.
        </p>
      );
    }

    if (Object.keys(alarm).includes("reply_id")) {
      return (
        <p className="whitespace-pre-line leading-[23px]">
          <span className="font-semibold">{alarm.user.nickname}</span>
          &nbsp;님이 회원님의 댓글에 답글을 달았습니다.
        </p>
      );
    }

    if (Object.keys(alarm).includes("follow_id")) {
      return (
        <p className="whitespace-pre-line leading-[23px]">
          <span className="font-semibold">{alarm.user.nickname}</span>
          &nbsp;님이 회원님을 팔로우합니다.
        </p>
      );
    }

    if (Object.keys(alarm).includes("like_id")) {
      return (
        <p className="whitespace-pre-line leading-[23px]">
          <span className="font-semibold">{alarm.user.nickname}</span>
          &nbsp;님이 회원님의 아바타를 좋아합니다.
        </p>
      );
    }

    if (Object.keys(alarm).includes("notice_id")) {
      return (
        <p className="whitespace-pre-line leading-[23px]">
          {alarm.notice.content}
        </p>
      );
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div
          className="flex justify-center items-center w-full h-full bg-transparent"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="inline-flex flex-col max-w-[640px] w-full h-[400px] mx-[16px] bg-[#FFFFFF] rounded-[8px] overflow-hidden
           "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full p-[16px]">
              <p className="text-[16px] font-semibold">알림</p>
              <p
                className="text-[12px] text-[#2778C7] font-semibold cursor-pointer"
                onClick={clickMarkAllAsRead}
              >
                모두 읽음으로 표시
              </p>
            </div>
            <Separator />
            <div className="flex flex-col grow overflow-y-scroll scrollbar-hide">
              <div className="flex flex-col">
                {alarms?.map((alarm: any, index: number) => {
                  return (
                    <div
                      className={cn(
                        "relative flex w-full space-x-[16px] p-[16px] cursor-pointer",
                        alarm.is_read ? "bg-[#FFFFFF]" : "bg-[#EFF6FF]"
                      )}
                      key={index}
                      onClick={() => clickAlarm(alarm)}
                    >
                      {Object.keys(alarm).includes("user") ? (
                        <Image
                          src={alarm.user.image}
                          className="object-cover shrink-0 w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
                          width={512}
                          height={512}
                          alt=""
                        />
                      ) : (
                        <div className="shrink-0 flex justify-center items-center w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] bg-[#FFFFFF]">
                          <Image
                            src={moopiImg}
                            className="w-[17px] h-auto"
                            width={512}
                            height={512}
                            alt=""
                          />
                        </div>
                      )}

                      <div className="flex flex-col space-y-[8px]">
                        {createAlarmText(alarm)}

                        <p className="text-[#CBCBCB]">
                          {getTimeAgo(alarm.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
