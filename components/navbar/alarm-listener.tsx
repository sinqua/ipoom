"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function AlarmListener({
  getAlarms,
}: {
  getAlarms: any;
}) {
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm_comments",
        },
        (payload) => {
          // console.log("insert comments", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm_replies",
        },
        (payload) => {
          // console.log("insert replies", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm_follows",
        },
        (payload) => {
          // console.log("insert follows", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm_likes",
        },
        (payload) => {
          // console.log("insert likes", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alarm_notices",
        },
        (payload) => {
          // console.log("insert notices", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "alarm_comments",
        },
        (payload) => {
          // console.log("update comments", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "alarm_replies",
        },
        (payload) => {
          // console.log("update replies", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "alarm_follows",
        },
        (payload) => {
          // console.log("update follows", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "alarm_likes",
        },
        (payload) => {
          // console.log("update likes", payload);
          getAlarms();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "alarm_notices",
        },
        (payload) => {
          // console.log("update notices", payload);
          getAlarms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <></>;
}
