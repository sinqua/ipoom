import { getProfile, getUserDetail } from "@/lib/supabase";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { CreateQuillUrl } from "@/lib/storage";
import PriceInfo from "@/components/user/price-info";
import { Metadata, ResolvingMetadata } from "next";

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
    title: `비용 안내 - ${profile!.nickname}님의 페이지`,
    description: `${profile!.nickname}님의 비용 안내 페이지입니다. | 무피`,
    openGraph: {
      title: profile!.nickname!,
      description: profile!.description
        ? profile!.description!
        : `${profile!.nickname}님의 비용 안내 페이지입니다.`,
      images: [image, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { user: string } }) {
  const detail = await getUserDetail(params.user);
  const priceInfoObject = JSON.parse(detail.price_info!);
  const priceInfo = await CreateHtml(priceInfoObject);

  return <PriceInfo content={priceInfo} />;
}

const CreateHtml = async (descriptionObject: any) => {
  if (!descriptionObject) return;

  const arr: any[] = [];
  Object.keys(descriptionObject).forEach((key) =>
    arr.push(descriptionObject[key])
  );

  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i].insert).includes("image")) {
      await CreateQuillUrl(arr[i].insert.image).then((url) => {
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
