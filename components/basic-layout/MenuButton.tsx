'use client'
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import messageImg from "@/app/assets/images/message.svg";
import alertImg from "@/app/assets/images/alert.svg";
import profileImg from "@/app/assets/images/profile.svg";

export default function MenuButton(props: any) {
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);

  return (
    <>
      {status === "authenticated" ? (
        <div className="sm:space-x-[30px] space-x-[20px] ml-[30px]">
          <Image
            src={messageImg}
            className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
            alt=""
          />
          <Image
            src={alertImg}
            className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
            alt=""
          />
          <Image
            src={profileImg}
            className="inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer"
            alt=""
            onClick={() => setModal(!modal)}
          />
          {modal && (
            <div className="absolute top-[60px] right-0 w-[144px] rounded-[10px] bg-white border-solid border-[1px] border-[#ECECEC] overflow-hidden z-10">
              <Link
                href={`/${session!.user.id}`}
                className="flex items-center h-[43px] px-[15px] cursor-pointer"
                onClick={() => setModal(false)}
              >
                프로필
              </Link>
              <div className="w-full h-[1px] bg-[#ECECEC]"></div>
              <Link
                href={`/${session!.user.id}/edit/profile-card`}
                className="flex items-center h-[43px] px-[15px] cursor-pointer"
                onClick={() => setModal(false)}
              >
                프로필 수정
              </Link>
              <div className="w-full h-[1px] bg-[#ECECEC]"></div>
              <div
                className="flex items-center h-[43px] px-[15px] cursor-pointer"
                onClick={() => {
                  signOut();
                  setModal(false);
                }}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/login"
          className="flex justify-center items-center w-[82px] h-[40px] ml-[98px] bg-white font-semibold rounded-[11px] border-solid border-[1px] border-[#333333] cursor-pointer"
        >
          로그인
        </Link>
      )}
    </>
  );
}
