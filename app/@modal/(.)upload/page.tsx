import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";
import UploadModal from "@/components/modal/upload-modal";
import { getMostUsedTags } from "@/lib/supabase";

export default async function Upload(props: any) {
  const { params } = props;

  const mostUsedTags = await getMostUsedTags();

  return (
    <UploadModal mostUsedTags={mostUsedTags} />
  );
}
