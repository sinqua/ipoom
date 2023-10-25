import EditModal from "@/components/modal/edit-modal";
import { createModelUrl, getAvatar, getMostUsedTags } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const revalidate = 0;

export default async function Edit(props: any) {
  const { params } = props;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatar = await getAvatar(params.avatar);
  const modelUrl = await createModelUrl(user?.id!, avatar?.vrm);
  const mostUsedTags = await getMostUsedTags();

  return (
    <EditModal avatar={avatar} model={modelUrl} mostUsedTags={mostUsedTags} />
  );
}
