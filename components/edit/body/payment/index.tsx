import Card from "@/components/card/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";

export default function Payment() {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"결제수단"}>
            결제수단 입니다.
          </CardHeader>
          <CardBody>
            개발중 ㅋㅋ
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
