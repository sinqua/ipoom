import { getUserDetail } from "@/lib/supabase";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { CreateQuillUrl } from "@/lib/storage";
import PriceInfo from "@/components/user/price-info";

export const revalidate = 0;

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
