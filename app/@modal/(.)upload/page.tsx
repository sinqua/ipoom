import UploadModal from "@/components/modal/upload-modal";
import { getMostUsedTags } from "@/lib/supabase";

export default async function Upload(props: any) {
  const mostUsedTags = await getMostUsedTags();

  return <UploadModal mostUsedTags={mostUsedTags} />;
}
