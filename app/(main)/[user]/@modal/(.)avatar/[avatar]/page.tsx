import React from "react";
import { createModelUrl, getAvatar, getComments } from "@/lib/supabase";
import AvatarModal from "@/components/modal/avatar-modal";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const revalidate = 0;

export default async function Avatar(props: any) {
  const { params } = props;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const avatar = await getAvatar(params.avatar);
  const comments = await getComments(params.avatar);
  const modelUrl = await createModelUrl(params.user, avatar?.vrm);

  return (
    <AvatarModal
      userId={user?.id}
      avatar={avatar}
      modelUrl={modelUrl}
      comments={comments}
    />
  );
}
