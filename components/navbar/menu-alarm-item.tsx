"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import AlertAlarm from "../alert-alarm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import AlarmListener from "./alarm-listener";

export default function AlarmItem({
  children,
  imgSrc,
}: {
  children: React.ReactNode;
  imgSrc: string;
}) {
  const supabase = createClientComponentClient<Database>();

  const [isOpen, setIsOpen] = useState(false);

  const [alarms, setAlarms] = useState<any>();
  const [unreadCount, setUnreadCount] = useState(0);

  const getAlarms = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: alarmCommentsData } = await supabase
      .from("alarm_comments")
      .select("*")
      .eq("target_user_id", user?.id);

    const { data: alarmRepliesData } = await supabase
      .from("alarm_replies")
      .select("*")
      .eq("target_user_id", user?.id);

    const { data: alarmFollowsData } = await supabase
      .from("alarm_follows")
      .select("*")
      .eq("target_user_id", user?.id);

    const { data: alarmLikesData } = await supabase
      .from("alarm_likes")
      .select("*")
      .eq("target_user_id", user?.id);

    const { data: alarmNoticesData } = await supabase
      .from("alarm_notices")
      .select("*")
      .eq("user_id", user?.id);

    const AllAlarmsData = [
      ...alarmCommentsData!,
      ...alarmRepliesData!,
      ...alarmFollowsData!,
      ...alarmLikesData!,
      ...alarmNoticesData!,
    ];

    const allAlarms = [];

    let count = 0;

    for (const alarm of AllAlarmsData!) {
      if (alarm.is_read === false) count++;

      if (Object.keys(alarm).includes("notice_id")) {
        const { data: noticeData } = await supabase
          .from("notices")
          .select("*")
          .eq("id", alarm.notice_id)
          .single();

        const newAlarm = {
          ...alarm,
          notice: noticeData,
        };

        allAlarms.push(newAlarm);
      } else {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", alarm.source_user_id)
          .single();

        const newAlarm = {
          ...alarm,
          user: profileData,
        };

        allAlarms.push(newAlarm);
      }
    }

    const sortedAlarms = allAlarms.sort((a, b) => {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    });

    setUnreadCount(count);
    setAlarms(sortedAlarms);
  };

  useEffect(() => {
    getAlarms();
  }, []);

  return (
    <>
      <AlarmListener getAlarms={getAlarms} />
      <div
        className="flex justify-between items-center w-full h-[48px] pl-[32px] pr-[24px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center space-x-[16px]">
          <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
          <p className="text-[16px]">{children}</p>
        </div>
        {unreadCount > 0 && (
          <div className="flex justify-center items-center w-[20px] h-[20px] bg-[#EB4C4C] rounded-[3px]">
            <p className="text-[12px] text-[#FFFFFF]">{unreadCount}</p>
          </div>
        )}
      </div>
      {isOpen && (
        <AlertAlarm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          alarms={alarms}
          setAlarms={setAlarms}
        />
      )}
    </>
  );
}
