import { getPortfolios } from "@/lib/supabase";
import Work from "@/components/user/work";
import Link from "next/link";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const works = await getPortfolios(params.user);

  return (
    <>
      <div className="grid ph:grid-cols-3 grid-cols-2 gap-[16px] grow h-fit ph:p-0 p-[16px] pb-[80px]">
        {works?.map((work: any, index: any) => {
          return (
            <Link 
            href={'/29010302-e915-450a-aec8-d036c261a9ad/avatar/2'}
            className="relative w-full dt:h-[240px] ph:h-[233px] h-[240px] rounded-[8px] overflow-hidden cursor-pointer" key={index}>
              <Work avatar={work} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
