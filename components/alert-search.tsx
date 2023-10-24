"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import searchCancelImg from "@/app/assets/images/search_cancel.svg";
import searchImg from "@/app/assets/images/search_dark.svg";
import cancelImg from "@/app/assets/images/cancel_gray.svg";
import moopiImg from "@/app/assets/logos/moopi_small.png";
import { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cn, getTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface AlertSearchProps {
  isOpen: boolean;
  setIsOpen: any;
}

export default function AlertSearch({ isOpen, setIsOpen }: AlertSearchProps) {
  const router = useRouter();

  const inputRef = useRef<any>();

  const supabase = createClientComponentClient<Database>();
  const [searchHistory, setSearchHistory] = useState<any>([]);

  const handleInput = async (event: any) => {
    if (event.key === "Enter") {
      if (inputRef.current.value) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        await supabase.from("search_history").insert([
          {
            user_id: user?.id,
            content: inputRef.current.value,
          },
        ]);

        setIsOpen(false);
        router.push(`/search?content=${inputRef.current.value}`);
      }
    }
  };

  const getSearchHistory = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { data: serachHistoryData, error } = await supabase
        .from("search_history")
        .select()
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(6);

      setSearchHistory(serachHistoryData);
    }
  };

  useEffect(() => {
    getSearchHistory();
  }, []);

  const deleteSearchHistory = async (id: any) => {
    await supabase.from("search_history").delete().eq("id", id);

    getSearchHistory();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <div
          className="flex justify-center items-center w-full h-full bg-transparent"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="inline-flex flex-col max-w-[640px] w-full h-[473px] mx-[16px] bg-[#FFFFFF] rounded-[8px] overflow-hidden
           "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full p-[16px]">
              <div className="relative felx items-center w-full">
                <input
                  type="text"
                  ref={inputRef}
                  className="w-full h-[35px] px-[14px] bg-white rounded-[8px] border-[1px] border-[#CCCCCC] focus:border-[#CCCCCC] focus:ring-0 text-[14px]"
                  placeholder="검색"
                  // onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  //   onChangeNickname(event.target.value);
                  // }}
                  onKeyDown={handleInput}
                />
                <Image
                  src={searchCancelImg}
                  className="absolute top-[50%] translate-y-[-50%] right-[14px] object-cover shrink-0 w-[16px] h-[16px] cursor-pointer"
                  width={512}
                  height={512}
                  alt=""
                />
              </div>
            </div>
            <Separator />
            <div className="flex flex-col grow overflow-y-scroll scrollbar-hide">
              <div className="flex justify-between items-center p-[16px]">
                <p className="text-[16px] font-semibold">검색기록</p>
                <p className="text-[12px] text-[#2778C7] cursor-pointer">
                  전체 삭제
                </p>
              </div>
              <div className="flex flex-col justify-center items-center w-full h-full">
                {searchHistory.length > 0 ? (
                  searchHistory.map((item: any, index: number) => {
                    return (
                      <div
                        className="flex justify-between items-center w-full px-[16px] py-[8px] cursor-pointer"
                        key={index}
                        onClick={() => {
                          setIsOpen(false);
                          router.push(`/search?content=${item.content}`);
                        }}
                      >
                        <div className="flex items-center space-x-[16px]">
                          <div className="flex justify-center items-center w-[40px] h-[40px] bg-[#FFFFFF] rounded-full border-[1px] border-[#CCCCCC]">
                            <Image
                              src={searchImg}
                              className="object-cover w-[16px] h-[16px]"
                              width={512}
                              height={512}
                              alt=""
                            />
                          </div>
                          <p>{item.content}</p>
                        </div>
                        <Image
                          src={cancelImg}
                          className="object-cover w-[16px] h-[16px] cursor-pointer"
                          width={512}
                          height={512}
                          alt=""
                          onClick={() => deleteSearchHistory(item.id)}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="mb-[20px] text-[#9D9D9D]">
                    최근 검색 내역 없음
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
