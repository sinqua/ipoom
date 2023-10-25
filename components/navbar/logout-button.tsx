"use client";
import Image from "next/image";
// import { signOut } from "next-auth/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";

export default function LogoutButton({ imgSrc }: { imgSrc: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    // <form action="/auth/logout" method="post">
    //   <button>
    <div
      className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
      onClick={() => handleSignOut()}
    >
      <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
      <p className="text-[16px]">로그아웃</p>
    </div>
    //   </button>
    // </form>
  );
}
