// 'use client'
import { useState } from "react";
import Card from "./card";

interface FollowProps {
  users: any;
}

export default async function Follow({ users }: FollowProps) {
    // const [currentPage, setCurrentPage] = useState(1);

    // console.log("total", users.length / 10);

  return (
    <div className="flex flex-col grow justify-between w-full space-y-[24px]">
      <div className="flex flex-col space-y-[16px]">
        <p className="text-[20px] font-semibold">팔로우</p>
        <p className="text-[#9D9D9D]">
          회원님이 팔로우한 유저들의 최근 아바타입니다.
        </p>
      </div>
      <div className="grid dt:grid-cols-2 tb:grid-cols-4 grid-cols-2 gap-x-[16px] gap-y-[24px]">
        {users.slice(0, 10).map((user: any, index: number) => {
          return <Card index={index} userData={user} key={index} />;
        })}
      </div>
      <div className="flex justify-center items-center h-[32px]">
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
      </div>
    </div>
  );
}
