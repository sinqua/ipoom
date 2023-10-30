"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

export default function BehaviorLogin() {
  const supabase = createClientComponentClient<Database>();

  const onSaveBehaviorLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase
      .from("behavior_login")
      .insert([{ user_id: session.user.id, is_mobile: isMobile }]);
  };

  useEffect(() => {
    onSaveBehaviorLogin();
  }, []);

  return <></>;
}
