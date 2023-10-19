"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import emptyImg from "@/app/assets/images/empty.png";

interface AlertAlarmProps {
  isOpen: boolean;
  setIsOpen: any;
}

export default function AlertAlarm({ isOpen, setIsOpen }: AlertAlarmProps) {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div
          className="flex justify-center items-center w-full h-full bg-transparent"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="inline-flex flex-col w-[300px] h-[400px] bg-[#FFFFFF] rounded-[8px]
           "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full p-[16px]">
              <p className="text-[16px] font-semibold">알림</p>
              <p className="text-[12px] text-[#2778C7] font-semibold cursor-pointer">
                모두 읽음으로 표시
              </p>
            </div>
            <Separator />
            <div className="flex flex-col grow overflow-y-scroll">
              <div className="flex flex-col">
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
                <div className="relative flex w-full space-x-[16px] p-[16px]">
                  <Image
                    src={emptyImg}
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <div className="flex flex-col space-y-[8px]">
                    <p className="whitespace-pre-line leading-[23px]">
                      <span className="font-semibold">ERUDA</span> 님이 회원님의
                      아바타를 좋아합니다.
                    </p>
                    <p className="text-[#CBCBCB]">1주전</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
