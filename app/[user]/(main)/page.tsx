import type { Metadata, ResolvingMetadata } from "next";
import { getPortfolios, getProfile } from "@/lib/supabase";
import Work from "@/components/user/work";
import { supabase } from "@/lib/database";

export const revalidate = 0;

type Props = {
  params: { user: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const user = params.user;

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
  const profile = await getProfile(user);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    // title: user,
    openGraph: {
      title: profile.description ? profile.background! : `${profile.nickname}님의 페이지입니다.`,
      images: [profile.background!, ...previousImages],
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
