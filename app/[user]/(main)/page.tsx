import type { Metadata, ResolvingMetadata } from "next";
import { getPortfolios, getProfile } from "@/lib/supabase";
import Work from "@/components/user/work";

export const revalidate = 0;

type Props = {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = params.user;
  const profile = await getProfile(user);

  const previousImages = (await parent).openGraph?.images || []
  const image = profile.background ? profile.background : ""

  return {
    title: `무피 - ${profile.nickname}님의 페이지`,
    description: `${profile.nickname}님의 페이지입니다. | 무피`,
    openGraph: {
      title: profile.nickname!,
      description: profile.description
        ? profile.description!
        : `${profile.nickname}님의 페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const works = await getPortfolios(params.user);

  return (
    <div className="grid ph:grid-cols-3 grid-cols-2 gap-[16px] grow h-fit ph:p-0 p-[16px] pb-[80px]">
      {works?.map((work: any, index: any) => {
        return <Work user={params.user} avatar={work} key={index} />;
      })}
    </div>
  );
}
