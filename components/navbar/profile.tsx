import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import faceImg from "@/app/assets/images/face.png";
import emptyImg from "@/app/assets/images/empty.png";

import { getProfile, getUser, getUserProfileImage } from "@/lib/supabase";
import KebabMenu from "./kebab-menu";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="relative flex justify-between items-center h-[88px] space-x-[44px] px-[32px] pr-[24px] border-t-[1px]">
        <div className="flex items-center space-x-[16px]">
          <Image
            src={faceImg}
            className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
            width={40}
            height={40}
            alt=""
            priority
          />
          <p className="text-[16px] text-[#637381]">{"맥놀"}</p>
        </div>
        <KebabMenu />
      </div>
    );
  }

  const profileImageData = getUserProfileImage(session?.user.id);
  const userData = getUser(session?.user.id);

  const [user, profileImage] = await Promise.all([userData, profileImageData]);

  return (
    <div className="relative flex justify-between items-center h-[88px] px-[32px] pr-[24px] border-t-[1px]">
      <div className="flex grow items-center space-x-[16px]">
        <Image
          src={profileImage.image ? profileImage.image : emptyImg}
          className="w-[40px] h-[40px] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)]"
          width={40}
          height={40}
          alt=""
          priority
        />
        <p className="text-[16px] text-[#637381]">{user.nickname}</p>
      </div>
      <KebabMenu />
    </div>
  );
}
