import Card from "./card";

interface PopularProps {
  avatars: any;
}

export default async function Popular({ avatars }: PopularProps) {
  return (
    <>
      <div className="flex flex-col w-full space-y-[24px]">
        <div className="flex flex-col space-y-[16px]">
          <div className="flex justify-between items-center">
            <p className="text-[20px] font-semibold">인기 업로드</p>
            <p className="text-[#2778C7] font-semibold cursor-pointer">
              모두 보기
            </p>
          </div>
          <p className="text-[#9D9D9D]">
            최근 유저들에게 가장 많은 호응을 얻은 아바타입니다.
          </p>
        </div>
        <div className="grid dt:grid-cols-5 tb:grid-cols-4 grid-cols-2 gap-x-[16px] gap-y-[24px]">
          {avatars.slice(0, 10).map((avatar: any, index: number) => {
            return <Card index={index} avatar={avatar} />;
          })}
        </div>
      </div>
    </>
  );
}
