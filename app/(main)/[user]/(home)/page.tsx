import type { Metadata, ResolvingMetadata } from "next";
import { getAvatars, getProfile } from "@/lib/supabase";
import Avatar from "@/components/user/avatar";
import InputGuide from "@/components/user/input-guide";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMemo } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Refresh from "@/components/refresh";
export const revalidate = 0;

type Props = {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const userId = params.user;
  const { data: profile } = await supabase
    .from("profiles")
    .select(`*,  tags (tag)`)
    .eq("user_id", userId)
    .single();

  const previousImages = (await parent).openGraph?.images || [];
  const image = profile!.background ? profile!.background : "";

  return {
    title: `${profile!.nickname}님의 페이지`,
    description: `${profile!.nickname}님의 페이지입니다. | 무피`,
    openGraph: {
      title: profile!.nickname!,
      description: profile!.description
        ? profile!.description!
        : `${profile!.nickname}님의 페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const avatars = await getAvatars(params.user);

  return (
    <>
      <Refresh />
      <div className="grid ph:grid-cols-3 grid-cols-2 gap-[16px] grow h-fit ph:p-0 p-[16px] pb-[80px]">
        {avatars?.map((avatar: any, index: any) => {
          return <Avatar user={params.user} avatar={avatar} key={index} />;
        })}
        {avatars?.length === 0 && <InputGuide />}
      </div>
    </>
  );
}
