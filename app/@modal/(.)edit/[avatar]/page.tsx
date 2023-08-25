import React from "react";
import { supabase, supabaseAuth } from "@/lib/database";
import EditModal from "@/components/modal/edit-modal";
import { createModelUrl, getAvatar } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Edit(props: any) {
  const { params } = props;
  const session = await getServerSession(authOptions);

  const avatarData = getAvatar(params.avatar);
  const [avatar] = await Promise.all([avatarData]);

  const modelUrl = await createModelUrl(session?.user.id!, avatar?.vrm);

  return (
    <EditModal avatar={avatar} model={modelUrl} />
  );
}
