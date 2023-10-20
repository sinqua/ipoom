import CopyButton from "@/components/modal/copy-button";
import Viewer from "@/components/modal/viewer";
import {
  createModelUrl,
  getAvatar,
  getComments,
  getFollowingUsers,
  getProfile,
} from "@/lib/supabase";
import type { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";

import { formatFullDate } from "@/lib/string";
import CommentSection from "@/components/modal/comment-section";

import Link from "next/link";
import LikeButton from "@/components/modal/like-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "@/components/main/header";
import Follow from "@/components/follow";
import Refresh from "@/components/refresh";

// type Props = {
//   params: { avatar: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const avatar = await getAvatar(params.avatar);
//   const profile = await getProfile(avatar.user_id!);

//   const previousImages = (await parent).openGraph?.images || [];
//   const image = profile!.background ? profile!.background : "";

//   return {
//     title: `아바타 [${avatar.name}]`,
//     description: `${profile!.nickname}님의 아바타 [${avatar.name}] 입니다. | 무피`,
//     openGraph: {
//       title: avatar.name!,
//       description: avatar.description
//         ? avatar.description!
//         : `${profile!.nickname}님의 아바타 [${avatar.name}] 입니다.`,
//       images: [image, ...previousImages],
//     },
//   };
// }

export default async function Page(props: any) {
  const { params } = props;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const followingUsers = await getFollowingUsers(user?.id!);

  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      <Refresh />
      <div className="relative flex flex-col items-center w-full grow">
        <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] px:pt-[60px] pt-[40px] pb-[80px] space-y-[64px]">
          <Follow users={followingUsers} />
        </div>
      </div>
    </div>
  );
}
