import Viewer from "@/components/modal/viewer";
import { createModelUrl, getAvatar } from "@/lib/supabase";

export const revalidate = 0;

export default async function Embed(props: any) {
  const { params } = props;

  const avatar = await getAvatar(params.avatar);
  const modelUrl = await createModelUrl(avatar!.user_id!, avatar?.vrm);

  return <Viewer modelUrl={modelUrl?.signedUrl} animation={avatar?.animation} />;
}