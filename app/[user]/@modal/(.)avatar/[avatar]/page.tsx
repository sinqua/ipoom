import React from "react";
import { createModelUrl, getAvatar } from "@/lib/supabase";
import AvatarModal from "@/components/modal/avatar-modal";

export const revalidate = 0;

export default async function Avatar(props: any) {
  const { params } = props;

  const avatar = await getAvatar(params.avatar);
  const modelUrl = await createModelUrl(params.user, avatar?.vrm);

  return <AvatarModal avatar={avatar} modelUrl={modelUrl} />;
}
