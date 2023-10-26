"use client";
import Image from "next/image";
import { formatDate } from "@/lib/string";
import Tag from "@/components/edit/avatars/tag";
import Link from "next/link";
import { deleteAvatar } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import checkImg from "@/app/assets/images/check_blue.svg";
import { useEffect, useState } from "react";
import AlertDelete from "@/components/alert-delete";

export default function Card({ avatar }: { avatar: any }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  const onDeleteAvatar = async () => {
    await deleteAvatar(avatar.id);

    setIsOpen(false);
    setStatus("done");
  };

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        setStatus("");
        router.refresh();
      }, 1000);
    }
  }, [status]);

  return (
    <>
      <div className="flex ph:flex-row flex-col p-[24px] ph:space-x-[24px] space-x-0 rounded-[10px] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
        <p className="ph:hidden block text-[20px] font-bold mb-[24px]">
          {avatar.name}
        </p>
        <div className="shrink-0 ph:w-[394px] w-full h-fit aspect-[8/7] !m-0 rounded-[8px] overflow-hidden">
          <Image
            src={avatar.thumbnail}
            className="object-cover w-full h-full"
            width={512}
            height={512}
            alt=""
          />
        </div>
        <div className="relative flex flex-col grow tb:h-[345px] h-auto justify-between tb:space-y-0 space-y-[40px]">
          <div className="flex flex-col w-full space-y-[16px]">
            <p className="ph:block hidden text-[20px] font-bold">
              {avatar.name}
            </p>
            <div className="flex flex-wrap justify-between w-full">
              <div className="flex space-x-[8px]">
                <p className="text-[#7B7B7B]">업로드</p>
                <p className="font-semibold">{formatDate(avatar.created_at)}</p>
              </div>
              <div className="flex space-x-[8px]">
                <p className="text-[#7B7B7B]">상태</p>
                <p className="font-semibold">
                  {avatar.visible ? "공개" : "비공개"}
                </p>
              </div>
              <div className="flex space-x-[8px]">
                <p className="text-[#7B7B7B]">애니메이션</p>
                <p className="font-semibold">{avatar.animations.name}</p>
              </div>
            </div>
          </div>
          <div className="relative flex tb:flex-row flex-col tb:space-x-[24px] space-x-0 tb:space-y-0 space-y-[24px]">
            <div className="relative flex flex-col w-full space-y-[16px]">
              <p className="text-[20px] font-bold">설명</p>
              <p className="w-full break-all">{avatar.description}</p>
            </div>
            <div className="relative flex flex-col w-full space-y-[32px]">
              <div className="flex flex-col space-y-[16px]">
                <p className="text-[20px] font-bold">아바타</p>
                <p>{avatar.vrm}</p>
              </div>
              <div className="relative flex flex-col space-y-[16px]">
                <p className="text-[20px] font-bold">태그</p>
                <div className="w-full h-[30px]">
                  <Tag tags={avatar.tags} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex ph:w-auto w-full space-x-[16px]">
              <div
                className="flex justify-center items-center ph:w-[116px] w-1/2 h-[42px] rounded-[10px] bg-[#FFFFFF] border-[1px] border-solid border-[#D4D4D4] cursor-pointer text-[14px]"
                // onClick={() => setStatus("check")}
                onClick={() => setIsOpen(true)}
              >
                삭제하기
              </div>
              <Link
                href={`/edit/${avatar.id}`}
                className="flex justify-center items-center ph:w-[116px] w-1/2 h-[42px] rounded-[10px] bg-[#368ADC] text-[14px] text-[#FFFFFF]"
              >
                수정하기
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AlertDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteAvatar={onDeleteAvatar}
      />
      {status === "done" && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 !m-0">
          <div className="flex justify-center items-center w-[180px] h-[180px] bg-[#FFFFFF] rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
            <div className="flex flex-col items-center space-y-[24px]">
              <Image src={checkImg} alt="" />
              <p className="text-[18px] font-semibold">삭제 완료</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
