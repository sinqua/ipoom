import { getPortfolios } from "@/lib/supabase";
import Work from "@/components/user/work";

export const revalidate = 0;

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
