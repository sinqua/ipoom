'use client'
import { addComment, getCommentProfile } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";

import Image from "next/image";
import LinkGrayImg from "@/app/assets/images/link_gray.svg";
import LinkBlackImg from "@/app/assets/images/link_black.svg";

export default function CopyButton() {
  const [isHovering, setIsHovered] = useState(false);
  const { toast } = useToast();
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
  };

  return (
    <Image
      src={isHovering ? LinkBlackImg : LinkGrayImg}
      className="w-[24px] h-[24px] cursor-pointer"
      width={512}
      height={512}
      alt=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyLink}
    />
  );
}
