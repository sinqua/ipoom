import React from "react";
import { createModelUrl, getAvatar } from "@/lib/supabase";
import AvatarModal from "@/components/AvatarModal";


export default async function Avatar(props: any) {
  const { params } = props;

  // const avatarData = getAvatar(params.avatar);
  const avatarData = getAvatar("65");

  const [
    avatar,
  ] = await Promise.all([
    avatarData,
  ]);

  // const modelUrl = await createModelUrl(params.user, avatar?.vrm);
  const modelUrl = await createModelUrl("6064c1dd-071b-42e4-92e4-d0989aed4ebc", avatar?.vrm);

  return (
    <AvatarModal avatar={avatar} modelUrl={modelUrl} />
  );
}

