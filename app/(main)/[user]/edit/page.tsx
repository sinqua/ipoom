import Thumbnail from "@/components/edit/profile-card/thumbnail";
import Nickname from "@/components/edit/profile-card/nickname";
import Kakao from "@/components/edit/profile-card/kakao";
import Toss from "@/components/edit/profile-card/toss";
import Tags from "@/components/edit/profile-card/tags";

import { getProfile, getLink, getMostUsedTags } from "@/lib/supabase";
import Description from "@/components/edit/profile-card/description";
import Twitter from "@/components/edit/profile-card/twitter";
import Background from "@/components/edit/profile-card/background";
import { Metadata, ResolvingMetadata } from "next";
import Refresh from "@/components/refresh";

export const revalidate = 0;

export async function generateMetadata(
  { params }: { params: { user: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = params.user;
  const profile = await getProfile(user);

  const previousImages = (await parent).openGraph?.images || [];
  const image = profile!.background ? profile!.background : "";

  return {
    title: `마이페이지 - ${profile!.nickname}님의 페이지`,
    description: `${profile!.nickname}님의 마이페이지입니다. | 무피`,
    openGraph: {
      title: profile!.nickname!,
      description: profile!.description
        ? profile!.description!
        : `${profile!.nickname}님의 마이페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const profileData = getProfile(params.user);
  const linkData = getLink(params.user);
  const mostUsedTagsData = getMostUsedTags();

  const [profile, link, mostUsedTags] = await Promise.all([
    profileData,
    linkData,
    mostUsedTagsData,
  ]);

  return (
    <>
      <Refresh />
      <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
        <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
          <Thumbnail url={profile!.image} />
          <Background url={profile!.background} />
          <Nickname name={profile!.nickname} />
          <Description description={profile!.description} />
          <Kakao link={link.kakao} />
          <Twitter link={link.twitter} />
          <Toss link={link.toss} />
          <Tags list={profile!.tags} mostUsedTags={mostUsedTags} />
        </div>
      </div>
    </>
  );
}
