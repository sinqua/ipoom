import EmbedAvatarModal from "@/components/modal/embed-modal";
import { createModelUrl, getAvatar } from "@/lib/supabase";

export const revalidate = 0;

export default async function Embed(props: any) {
  const { params } = props;

  const avatar = await getAvatar(params.avatar);
  const modelUrl = await createModelUrl(avatar!.user_id!, avatar?.vrm);

  return <EmbedAvatarModal avatar={avatar} modelUrl={modelUrl} />;
}