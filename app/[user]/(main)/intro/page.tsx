import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import { getUserDetail } from "@/lib/supabase";
import RichTextEditor from "@/components/edit/rich-text-editor";

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      소개
    </div>
  );
}
