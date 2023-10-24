"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";

interface AlertLoginProps {
  isOpen: boolean;
  setIsOpen: any;
}

export default function AlertLogin({ isOpen, setIsOpen }: AlertLoginProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div className="flex justify-center items-center w-full h-full bg-transparent">
          <div className="flex flex-col bg-[#FFFFFF] rounded-[8px]">
            <div className="inline-flex flex-col items-center px-[56px] py-[32px] space-y-[16px]">
              <p className="text-[16px] font-semibold whitespace-nowrap">
                로그인이 필요한 서비스입니다.
              </p>
              <p className="text-[14px] text-[#9D9D9D]">
                로그인 페이지로 이동합니다.
              </p>
            </div>
            <Separator />
            <div className="flex text-[14px]">
              <div
                className="basis-1/2 h-[50px] flex justify-center items-center cursor-pointer text-[#2778C7]"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/login?callbackUrl=${pathname}`);
                }}
              >
                이동
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
