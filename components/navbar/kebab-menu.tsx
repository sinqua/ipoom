"use client";
import Image from "next/image";
import { useState } from "react";
// import { signOut } from "next-auth/react";

import moreImg from "@/app/assets/images/more.svg";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export default function KebabMenu() {
  const supabase = createClientComponentClient<Database>();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const logOut = () => {
  //   signOut();
  //   setIsOpen(false);
  // };
  // const url = session ? `/${session?.user.id}/edit` : "";

  return (
    <>
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-white hover:bg-[#F6F6F6] cursor-pointer"
        onClick={toggle}
      >
        <Image src={moreImg} className="w-[24px] h-[24px]" alt="" />
      </div>
      {/* <Transition className="absolute bottom-[77px] right-[24px]" show={isOpen}>
        <div className="flex flex-col w-[152px] border-solid border-[1px] rounded-[8px] bg-white ">
          <button className="w-[152px] h-[40px] text-[14px] text-[#333333]">
            <Link href={url}>마이페이지</Link>
          </button>
          <button
            className="w-[152px] h-[40px] text-[14px] text-[#333333]"
            onClick={logOut}
          >
            로그아웃
          </button>
        </div>
      </Transition> */}
    </>
  );
}
