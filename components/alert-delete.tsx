"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";

interface AlertLoginProps {
  isOpen: boolean;
  setIsOpen: any;
  deleteAvatar: any;
}

export default function AlertDelete({
  isOpen,
  setIsOpen,
  deleteAvatar,
}: AlertLoginProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div className="flex justify-center items-center w-full h-full bg-transparent">
          <div className="flex flex-col bg-[#FFFFFF] rounded-[8px]">
            <div className="inline-flex flex-col items-center px-[56px] py-[32px] space-y-[16px]">
              <p className="text-[16px] font-semibold whitespace-nowrap">
                게시물을 삭제합니다.
              </p>
              <p className="text-[14px] text-[#9D9D9D]">
                나의 아바타를 리스트에서 삭제합니다.
              </p>
            </div>
            <Separator />
            <div className="flex text-[14px]">
              <div
                className="basis-1/2 h-[50px] flex justify-center items-center cursor-pointer text-[#E14753]"
                onClick={(e) => {
                  e.stopPropagation();
                  // router.push(`/login?callbackUrl=${pathname}`);
                  deleteAvatar();
                }}
              >
                삭제
              </div>
              <Separator orientation="vertical" />
              <div
                className="basis-1/2 h-[50px] flex justify-center items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
