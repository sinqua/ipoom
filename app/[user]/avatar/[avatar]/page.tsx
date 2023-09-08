import { getAvatar, getProfile } from "@/lib/supabase";
import type { Metadata, ResolvingMetadata } from "next";


type Props = {
  params: { user: string, avatar: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const profile = await getProfile(params.user);
  const avatar = await getAvatar(params.avatar);

  const previousImages = (await parent).openGraph?.images || []
  const image = profile.background ? profile.background : ""

  return {
    openGraph: {
      title: avatar.name!,
      description: avatar.description
        ? avatar.description!
        : `${profile.nickname}님의 아바타 [${avatar.name}] 입니다.`,
      images: [...previousImages, image],
    },
  };
}

export default function Avatar(props: any) {
  return null;
}
