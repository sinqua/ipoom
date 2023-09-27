"use client";
import { SyncLoader } from "react-spinners";
import { supabase } from "@/lib/database";
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
  const [optimized, setOptimized] = useState(status);

  useEffect(() => {
    if (status) return;
    if (optimized) return;
    
    const interval = setInterval(() => {
      supabase
        .from("avatars")
        .select("optimized")
        .eq("id", avatar)
        .then(({ data, error }) => {
          if (data![0].optimized === true) {
            setOptimized(true);
          }
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [avatar, router, status]);

  if (status) return null;
  if (optimized) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-[1.5px]">
      <SyncLoader color="#2778C7" />
    </div>
  );

}
