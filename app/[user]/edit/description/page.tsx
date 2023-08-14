import Card from "@/components/card";
import CardHeader from "@/components/card/header";
import CardBody from "@/components/card/body";
import { getUserDetail } from "@/lib/supabase";
import RichTextEditor from "@/components/edit/rich-text-editor";


export default async function Page({ params }: { params: { user: string } }) {
  const userDetail = await getUserDetail(params.user);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Card>
          <CardHeader title={"가격정보"}>
            서비스에 대한 가격정보를 상세히 적어주세요.
          </CardHeader>
          <CardBody>
            <div className="h-[500px]">
              <RichTextEditor content={userDetail.description} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
