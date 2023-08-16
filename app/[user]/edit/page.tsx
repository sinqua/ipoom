import Thumbnail from "@/components/edit/profile-card/thumbnail";
import Nickname from "@/components/edit/profile-card/nickname";
import Kakao from "@/components/edit/profile-card/kakao";
import Toss from "@/components/edit/profile-card/toss";
import Tags from "@/components/edit/profile-card/tags";

import { getProfile, getUserProfileImage, getLink, getUser } from "@/lib/supabase";

export default async function Page({ params }: { params: { user: string } }) {
  const profileData = getProfile(params.user);
  const profileImageData = getUserProfileImage(params.user);
  const linkData = getLink(params.user);
  const userData = getUser(params.user);

  const [user, profile, profileImage, link] = await Promise.all([
    userData,
    profileData,
    profileImageData,
    linkData,
  ]);

  return (
    <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
      <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
        <Thumbnail url={profileImage.image} />
        <Nickname name={user.nickname}/>
        <Kakao link={link.kakao} />
        <Toss link={link.toss} />
        <Tags list={profile.tags} />
      </div>
    </div>
  );
}
