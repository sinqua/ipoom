"use client";
import { SyncLoader } from "react-spinners";
import { useState } from "react";
import { supabase } from "@/lib/database";
import { useRouter } from "next/navigation";
export default function Cover({
  avatar,
  status,
}: {
  avatar: any;
  status: boolean | null;
}) {
  const router = useRouter();

  if (status === false) {
    setInterval(() => {
      supabase
        .from("avatars")
        .select("optimized")
        .eq("id", avatar)
        .then(({ data, error }) => {
          if (data![0].optimized === true) {
            router.refresh();
          }
        });
    }, 1000);

    return (
      <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-[1.5px]">
        <SyncLoader color="#2778C7" />
      </div>
    );
  }

  return null;
}
