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

export default function AlertLogin({
  isOpen,
  setIsOpen,
}: AlertLoginProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그인이 필요한 서비스입니다.</AlertDialogTitle>
          <AlertDialogDescription>
            로그인 페이지로 이동합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.push(`/login?callbackUrl=${pathname}`)}
          >
            이동
          </AlertDialogAction>
          <Separator orientation="vertical" />
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
