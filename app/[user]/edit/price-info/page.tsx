import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import { getUserDetail } from "@/lib/supabase";
import RichTextEditor from "@/components/edit/rich-text-editor";
import PriceInfo from "@/components/edit/price-info";

export default async function Page({ params }: { params: { user: string } }) {
  const userDetail = await getUserDetail(params.user);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <PriceInfo content={userDetail.price_info} />
      </div>
    </div>
  );
}
