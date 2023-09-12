import { getProfile } from "@/lib/supabase";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 0;

export async function generateMetadata(
  { params }: { params: { user: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = params.user;
  const profile = await getProfile(user);

  const previousImages = (await parent).openGraph?.images || [];
  const image = profile.background ? profile.background : "";

  return {
    title: `소개 - ${profile.nickname}님의 페이지`,
    description: `${profile.nickname}님의 소개 페이지입니다. | 무피`,
    openGraph: {
      title: profile.nickname!,
      description: profile.description
        ? profile.description!
        : `${profile.nickname}님의 소개 페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const profile = await getProfile(params.user);

  return (
    <div className="flex grow w-full dt:px-0 px-[16px] py-[40px] !pt-0">
      {profile.description}
    </div>
  );
}
