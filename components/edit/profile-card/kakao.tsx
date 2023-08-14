import Card from "@/components/card";
import CardHeader from "@/components/card/header";

export default function Kakao() {
  return (
    <Card>
      <CardHeader title={"오픈카톡 링크"}>
        사용중인 오픈카톡 전체 링크를 입력해주세요.
        <br />
        {"예시) https://open.kakao.com/o/s7l8njtf"}
      </CardHeader>
      <div className="flex items-center ph:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
        <input
          type="text"
          className="grow h-full outline-none text-sm"
          placeholder="오픈카톡 링크를 입력해주세요."
        ></input>
      </div>
    </Card>
  );
}
