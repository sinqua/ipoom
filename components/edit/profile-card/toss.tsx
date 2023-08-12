import Card from "@/components/card/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";

export default function Toss() {
  return (
    <Card>
      <CardHeader title={"토스아이디 링크"}>
        사용중인 토스 익명송금 전체 링크를 입력해주세요.
        <br />
        {"예시) https://toss.me/istick"}
      </CardHeader>
      <CardBody>
        <div className="flex items-center ph:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
          <input
            type="text"
            className="grow h-full outline-none text-sm"
            placeholder="토스아이디 링크를 입력해주세요."
          ></input>
        </div>
      </CardBody>
    </Card>
  );
}
