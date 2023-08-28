import EditModal from "@/components/modal/edit-modal";
import { createModelUrl, getAvatar, getMostUsedTags } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 0;


export default async function Edit(props: any) {
  const { params } = props;
  const session = await getServerSession(authOptions);

  const avatar = await getAvatar(params.avatar);
  const modelUrl = await createModelUrl(session?.user.id!, avatar?.vrm);
  const mostUsedTags = await getMostUsedTags();

  return (
    <div>Hello</div>
    // <EditModal avatar={avatar} model={modelUrl} mostUsedTags={mostUsedTags} />
  );
}
