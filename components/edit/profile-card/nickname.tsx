import Card from "@/components/card";
import CardHeader from "@/components/card/header";

export default function Nickname() {
  return (
    <Card>
      <CardHeader title={"닉네임"}>
        타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수
        있습니다.
        <br />
        닉네임 변경은 2달에 1회 진행할 수 있습니다.
      </CardHeader>
      <div className="flex items-center ph:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
        <input
          type="text"
          className="grow h-full outline-none text-sm"
          placeholder="닉네임을 입력해주세요."
        ></input>
      </div>
    </Card>
  );
}
