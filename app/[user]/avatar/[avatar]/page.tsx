import CopyButton from "@/components/modal/copy-button";
import Viewer from "@/components/modal/viewer";
import {
  createModelUrl,
  getAvatar,
  getComments,
  getProfile,
} from "@/lib/supabase";
import type { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";

import { formatFullDate } from "@/lib/string";
import CommentSection from "@/components/modal/comment-section";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import LikeButton from "@/components/modal/like-button";

type Props = {
  params: { user: string; avatar: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const profile = await getProfile(params.user);
  const avatar = await getAvatar(params.avatar);

  const previousImages = (await parent).openGraph?.images || [];
  const image = profile.background ? profile.background : "";

  return {
    title: `아바타 [${avatar.name}]`,
    description: `${profile.nickname}님의 아바타 [${avatar.name}] 입니다. | 무피`,
    openGraph: {
      title: avatar.name!,
      description: avatar.description
        ? avatar.description!
        : `${profile.nickname}님의 아바타 [${avatar.name}] 입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Avatar(props: any) {
  const { params } = props;

  const session = await getServerSession(authOptions);

  const profile = await getProfile(params.user);
  const avatar = await getAvatar(params.avatar);
  const comments = await getComments(params.avatar);
  const modelUrl = await createModelUrl(params.user, avatar?.vrm);

  return (
    <div className="flex flex-col h-auto min-h-screen">
      <div className="flex justify-center items-center w-full dt:h-[80px] h-[65px] space-x-[16px]">
        <Image
          src={avatar.thumbnailUrl}
          className="ph:w-[40px] ph:h-[40px] w-[32px] h-[32px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
          width={512}
          height={512}
          alt=""
        />
        <p className="ph:text-[24px] text-[20px] font-semibold">
          {avatar.name}
        </p>
      </div>
      <div className="relative flex justify-center h-[600px]">
        <Viewer
          modelUrl={modelUrl?.signedUrl}
          animation={numberToStringMap[avatar.animation!]}
          toolbarCss={
            "absolute flex flex-row h-fit ph:top-[40px] top-[24px] dt:right-0 right-[24px] space-x-[16px] pointer-events-auto"
          }
        />
        <div className="absolute dt:max-w-[1008px] w-full h-full pointer-events-none">
          <div className="absolute bottom-[24px] dt:left-0 left-[24px] pointer-events-auto">
            <div className="flex flex-col space-y-[8px]">
              <div className="flex items-center space-x-[8px]">
                <div className="flex items-center space-x-[16px]">
                  <Image
                    src={profile.image!}
                    className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
                    width={512}
                    height={512}
                    alt=""
                  />
                  <p className="text-[16px] font-bold">{profile.nickname}</p>
                </div>
                <Link href={`/${profile.user_id}`}>
                  <p className="text-[12px] font-semibold text-[#368ADC]">
                    • 페이지 이동
                  </p>
                </Link>
              </div>
              <div className="flex space-x-[16px]">
                {profile.tags.map((item: any, index: any) => {
                  return (
                    <p className="text-[14px]" key={index}>{`#${item.tag}`}</p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-[40px] pb-[80px]">
        <div className="flex flex-col dt:max-w-[1008px] w-full dt:px-0 px-[16px] space-y-[24px]">
          <div className="flex justify-between">
            <p className="text-[24px] font-semibold">{avatar.name}</p>
            <div className="flex items-center space-x-[24px]">
              <CopyButton />
              <LikeButton
                userId={session?.user.id}
                avatarId={avatar.id}
                likes={avatar.likes}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-[40px]">
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[16px] font-semibold text-[#9D9D9D]">
                아바타 설명
              </p>
              <p className="leading-[25px] whitespace-pre-line">
                {avatar.description}
              </p>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[16px] font-semibold text-[#9D9D9D]">태그</p>
              <div className="flex flex-wrap w-full">
                {avatar.tags.map((item: any, index: any) => {
                  return (
                    <div
                      className="flex justify-center items-center w-fit h-fit px-[8px] py-[4px] mr-[10px] mb-[10px] bg-[#E9E9E9] rounded-[7px] text-[14px] whitespace-nowrap"
                      key={index}
                    >
                      {item.tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[16px] font-semibold text-[#9D9D9D]">썸네일</p>
              <div className="relative flex w-[304px] aspect-[8/7] rounded-[10px] overflow-hidden">
                <Image
                  src={avatar.thumbnailUrl}
                  className="object-cover w-full h-full"
                  width={512}
                  height={512}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <p className="text-[16px] font-semibold text-[#9D9D9D]">업로드</p>
              <p>{formatFullDate(avatar.created_at)}</p>
            </div>
            <CommentSection
              userId={session?.user.id}
              avatarId={avatar.id}
              comments={comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const numberToStringMap: { [key: number]: string } = {
  1: "HipHopDancing",
  2: "PutYourHandsUp",
  3: "Thankful",
  4: "Idle",
};
