"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = ("/join?callbackUrl=" +
    searchParams.get("callbackUrl")) as string;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      if (session?.user.nickname) {
        router.push(searchParams.get("callbackUrl") ?? `/`);
      } else {
        router.push(callbackUrl);
      }
    }
  }, [session, status]);

  return <div className="w-full h-full">확인중</div>;
}
