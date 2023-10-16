import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import PortfolioCard from "@/components/edit/portfolio/card";
import { getPortfolios } from "@/lib/supabase";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const portfolios = await getPortfolios(params.user);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"작업"}>
            저장된 캐릭터가 최신순으로 표시됩니다.
          </CardHeader>
          <div className="flex flex-col space-y-[24px]">
            {portfolios.map((portfolio: any, index: any) => {
              return <PortfolioCard avatar={portfolio} key={index} />;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
