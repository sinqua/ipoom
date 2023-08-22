import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";
import UploadModal from "@/components/modal/upload-modal";

export default function Upload(props: any) {
  const { params } = props;

  return (
    <UploadModal />
  );
}
