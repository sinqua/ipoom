import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";
import PortfolioCard from "@/components/edit/portfolio/card";

export default function Portfolio() {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"포트폴리오 수정"}>
            업로드했던 포트폴리오를 수정할 수 있어요.
          </CardHeader>
          <CardBody>
            <div className="flex flex-col space-y-[24px]">
            <PortfolioCard />
            <PortfolioCard />
            <PortfolioCard />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
