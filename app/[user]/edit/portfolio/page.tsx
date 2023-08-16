import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import PortfolioCard from "@/components/edit/portfolio/card";

export default function Page() {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"작업"}>
            업로드했던 작업물을 수정할 수 있어요.
          </CardHeader>
          <div className="flex flex-col space-y-[24px]">
            <PortfolioCard />
            <PortfolioCard />
            <PortfolioCard />
          </div>
        </Card>
      </div>
    </div>
  );
}
