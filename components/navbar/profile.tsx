import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import emptyImg from "@/app/assets/images/empty.png";

import { getProfile } from "@/lib/supabase";
import KebabMenu from "./kebab-menu";
import LoginButton from "./login-button";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginButton />;
  }

  const profile = await getProfile(session?.user.id);

  return (
    <div className="relative flex justify-between items-center h-[88px] px-[32px] pr-[24px] border-t-[1px]">
      <div className="flex grow items-center space-x-[16px]">
        <Image
          src={profile.image ? profile.image : emptyImg}
          className="object-cover w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
          width={40}
          height={40}
          alt=""
          priority
        />
        <p className="text-[16px] text-[#637381]">{profile.nickname}</p>
      </div>
      <KebabMenu />
    </div>
  );
}
