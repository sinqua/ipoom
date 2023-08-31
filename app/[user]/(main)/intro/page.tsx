import { getProfile } from "@/lib/supabase";

export const revalidate = 0;

export default async function Page({ params }: { params: { user: string } }) {
  const profile = await getProfile(params.user);

  return (
    <div className="flex grow w-full dt:px-0 px-[16px] py-[40px] !pt-0">
      {profile.description}
    </div>
  );
}
