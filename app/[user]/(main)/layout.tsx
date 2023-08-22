import Header from "@/components/user/header";
import ProfileCard from "@/components/user/profile-card";
import {
  getLink,
  getProfile,
  getUser,
  getUserProfileImage,
} from "@/lib/supabase";
import { Suspense } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const userData = getUser(params.user);
  const profileData = getProfile(params.user);
  const profileImageData = getUserProfileImage(params.user);
  const linkData = getLink(params.user);

  const [user, profile, profileImage, link] = await Promise.all([
    userData,
    profileData,
    profileImageData,
    linkData,
  ]);

  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      <div className="flex justify-center w-full grow dt:px-0 ph:px-[16px] ph:py-[40px]">
        <div className="relative flex ph:flex-row flex-col-reverse  dt:max-w-[1008px] w-full h-full dt:space-x-[64px] ph:space-x-[32px] space-x-0">
          <Suspense>
            {children}
            <ProfileCard
              user={user}
              profile={profile}
              profileImage={profileImage}
              link={link}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
