"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";
import { supabase } from "@/lib/database";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = ("/join?callbackUrl=" +
    searchParams.get("callbackUrl")) as string;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      verifyExist(session?.user.id).then((result) => {
        console.log("result", result);

        if (result) {
          router.push(searchParams.get("callbackUrl") ?? `/`);
        } else {
          router.push(callbackUrl);
        }
      });
    }
  }, [status]);

  return <div className="w-full h-full">확인중</div>;
}

const verifyExist = (userID: any) => {
  return supabase
    .from("profiles")
    .select()
    .eq("user_id", userID)
    .then(({ data, error }) => {
      if (data?.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};
