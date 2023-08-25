import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"대표 아바타"}>
            프로필 페이지에서 보여줄 아바타 파일을 업로드 합니다.
            <br />
            50mb 이하의 vrm 파일을 사용해주세요.
            <br />
            썸네일은 1000 x 1000 이상의 JPEG 또는 PNG 파일을 권장합니다.
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
