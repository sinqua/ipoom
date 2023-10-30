"use client";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import linkImg from "@/app/assets/images/link_blue.svg";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { isMobile } from "react-device-detect";

export default function CopyButton() {
  const { toast } = useToast();

  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();

  const copyLink = () => {
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = `moopi.offing.me${pathname}`;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);

    toast({
      className:
        "flex justify-center max-w-[350px] w-full h-[47px] mx-[36px] bg-[#368ADC] rounded-[8px] border-none text-[#FFFFFF]",
      description: "링크가 복사되었습니다.",
    });

    onSaveBehaviorShare();
  };

  const onSaveBehaviorShare = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase
      .from("behavior_share")
      .insert([{ user_id: session.user.id, is_mobile: isMobile }]);
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-[96px] h-[42px] space-x-[16px] bg-[#FFFFFF] hover:bg-[#F6F6F6] border-[1px] border-[#368ADC] rounded-[10px] cursor-pointer"
        onClick={copyLink}
      >
        <Image
          src={linkImg}
          width={512}
          height={512}
          className="w-[20px] h-[20px]"
          alt=""
        />
        <p className="text-[14px] text-[#368ADC]">공유</p>
      </div>
    </>
  );
}
