import { getUserDetail } from "@/lib/supabase";
import Description from "@/components/edit/description";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const userDetail = await getUserDetail(params.user);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Description content={userDetail.description} />
      </div>
    </div>
  );
}
