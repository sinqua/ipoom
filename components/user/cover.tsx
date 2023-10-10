"use client";
import { SyncLoader } from "react-spinners";
import { getSupabase } from "@/lib/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Cover({
  avatar,
  status,
}: {
  avatar: any;
  status: boolean | null;
}) {
  const router = useRouter();
  
  useEffect(() => {
    if (status) return;

    const interval = setInterval(() => {
      getSupabase()
        .from("avatars")
        .select("optimized")
        .eq("id", avatar)
        .then(({ data, error }) => {
          if (data![0].optimized === true) {
            router.refresh();
          }
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [avatar, router, status]);

  if (status) return null;
  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-[1.5px]">
      <SyncLoader color="#2778C7" />
    </div>
  );
}
