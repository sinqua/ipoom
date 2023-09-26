import Header from "@/components/main/header";
import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/carousel";
import {
  getMainFollowAvatars,
  getMainPopularAvatars,
  getMainRecentAvatars,
  getMainTags,
} from "@/lib/supabase";
import Follow from "@/components/main/follow";
import Popular from "@/components/main/popular";
import Recent from "@/components/main/recent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";
import Tags from "@/components/main/header/tags";

export default async function Main() {
  const session = await getServerSession(authOptions);

  const tagsData = getMainTags();
  const popularAvatarsData = getMainPopularAvatars();
  const followAvatarsData = session
    ? getMainFollowAvatars(session?.user.id)
    : null;
  const recentAvatarsData = getMainRecentAvatars();

  const [tags, popularAvatars, followAvatars, recentAvatars] =
    await Promise.all([
      tagsData,
      popularAvatarsData,
      followAvatarsData,
      recentAvatarsData,
    ]);

  return (
    <div className="relative flex h-auto text-[#333333]">
      <Navbar />
      <div className="relative flex flex-col grow h-auto">
        <div className="relative flex flex-col h-auto min-h-screen">
          <Header />
          <div className="relative flex flex-col items-center w-full grow">
            <Tags tags={tags} />
            <Carousel />
            <Suspense>
              <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] px:pt-[60px] pt-[40px] pb-[80px] space-y-[64px]">
                <Popular avatars={popularAvatars} />
                {session && <Follow avatars={followAvatars} />}
                <Recent avatars={recentAvatars} />
              </div>
            </Suspense>
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
}
