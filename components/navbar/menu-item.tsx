"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AlertLogin from "../alert-login";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";

export default function Item({
  children,
  imgSrc,
  url,
}: {
  children: React.ReactNode;
  imgSrc: string;
  url: string;
}) {
  const supabase = createClientComponentClient<Database>();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const ClickItem = async () => {
    if (url !== "/home") {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setIsOpen(true);
        return;
      }
    }

    router.push(url);
  };

  return url !== "/contest" ? (
    <>
      <div
        className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
        onClick={ClickItem}
      >
        <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
        <p className="text-[16px]">{children}</p>
      </div>
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  ) : (
    <>
      <Link href={"/contest"} target="_blank"
        className="flex items-center w-full h-[48px] px-[32px] space-x-[16px] bg-white hover:bg-[#F6F6F6] cursor-pointer"
      >
        <Image src={imgSrc} className="w-[24px] h-[24px]" alt="" priority />
        <p className="text-[16px]">{children}</p>
      </Link>
      <AlertLogin isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
