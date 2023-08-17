import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import { getUserDetail } from "@/lib/supabase";
import RichTextEditor from "@/components/edit/rich-text-editor";

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      비용 안내
    </div>
  );
}
