import React from "react";
import { createModelUrl, getAvatar } from "@/lib/supabase";
import AvatarModal from "@/components/modal/avatar-modal";

export default async function Avatar(props: any) {
  const { params } = props;

  const avatarData = getAvatar(params.avatar);
  const [avatar] = await Promise.all([avatarData]);

  const modelUrl = await createModelUrl(params.user, avatar?.vrm);

  return <AvatarModal avatar={avatar} modelUrl={modelUrl} />;
}
