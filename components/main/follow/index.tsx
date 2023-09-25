import { getTimeAgo } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Image from "next/image";
import LikeButton from "../like-button";

interface FollowProps {
  avatars: any;
}

export default async function Follow({ avatars }: FollowProps) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex flex-col w-full space-y-[24px]">
        <div className="flex flex-col space-y-[16px]">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-semibold">팔로우</p>
            <p className="text-[#2778C7] font-semibold cursor-pointer">
              모두 보기
            </p>
          </div>
          <p className="text-[#9D9D9D]">
            회원님이 팔로우한 유저들의 최근 아바타입니다.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-x-[16px] gap-y-[24px]">
          {avatars.slice(0, 10).map((avatar: any, index: number) => {
            return (
              <div
                className="w-full rounded-[8px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] overflow-hidden cursor-pointer"
                key={index}
              >
                <div className="relative overflow-hidden">
                  <Image
                    draggable={false}
                    src={avatar.thumbnail}
                    className="object-cover w-full aspect-square hover:scale-110 duration-200"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <LikeButton
                    userId={session?.user.id}
                    avatarId={avatar.id}
                    likes={avatar.likes}
                  />
                </div>
                <div className="flex flex-col h-max space-y-[8px] p-[8px]">
                  <div className="flex justify-between items-center">
                    <p className="text-[16px] font-semibold">{avatar.name}</p>
                    <p className="text-[12px]">
                      {getTimeAgo(avatar.created_at)}
                    </p>
                  </div>
                  <div className="w-full pr-[15px]">
                    <p className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {avatar.tags.length > 0
                        ? avatar.tags.map((item: any, index: any) => {
                            return index === 0
                              ? `#${item.tag}`
                              : `\u00A0\u00A0#${item.tag}`;
                          })
                        : `\u00A0`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-[8px]">
                    <Image
                      draggable={false}
                      src={avatar.user.image}
                      className="w-[20px] h-[20px] rounded-full"
                      width={512}
                      height={512}
                      alt=""
                    />
                    <p className="text-[12px] font-semibold">
                      {avatar.user.nickname}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
