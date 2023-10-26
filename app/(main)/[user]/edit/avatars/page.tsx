import Card from "@/components/edit/card";
import CardHeader from "@/components/edit/card/header";
import AvatarCard from "@/components/edit/avatars/card";
import { getAvatars } from "@/lib/supabase";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const avatars = await getAvatars(params.user);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"아바타 수정"}>
            업로드했던 아바타를 수정할 수 있어요.
            <br />
            50mb 이하의 vrm 파일을 사용해주세요.
            <br />
            썸네일은 500 x 500 이상의 JPEG 또는 PNG 파일을 권장합니다.
          </CardHeader>
          <div className="flex flex-col space-y-[24px]">
            {avatars.map((avatar: any, index: any) => {
              return <AvatarCard avatar={avatar} key={index} />;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
