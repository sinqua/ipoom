import type { Metadata, ResolvingMetadata } from "next";

import { getProfile, getUserDetail } from "@/lib/supabase";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { CreateQuillUrl } from "@/lib/storage";
import Description from "@/components/user/description";

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
    title: `커미션 안내 - ${profile!.nickname}님의 페이지`,
    description: `${profile!.nickname}님의 커미션 안내 페이지입니다.`,
    openGraph: {
      title: profile!.nickname!,
      description: profile!.description
        ? profile!.description!
        : `${profile!.nickname}님의 커미션 안내 페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const detail = await getUserDetail(params.user);
  const descriptionObject = JSON.parse(detail.description!);
  const description = await CreateHtml(descriptionObject);

  return <Description content={description} />;
}

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateQuillUrl(arr[i].insert.image).then(async (url) => {
        arr[i].attributes = {
          display: "inline-block",
        };
      });
    }
  }

  var cfg = {};
  var converter = new QuillDeltaToHtmlConverter(arr, cfg);

  converter.afterRender((groupType: any, htmlString: string) => {
    htmlString = htmlString.replace(/<img/g, '<img loading="lazy"');
    return htmlString;
  });

  var html = converter.convert();
  return html;
};
