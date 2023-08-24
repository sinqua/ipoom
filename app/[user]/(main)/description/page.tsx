import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import { getUserDetail } from "@/lib/supabase";
import RichTextEditor from "@/components/edit/rich-text-editor";
import Link from "next/link";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <Link href={'/29010302-e915-450a-aec8-d036c261a9ad/avatar/1'} className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      커미션 안내
    </Link>
  );
}
