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

import { Suspense } from "react";
import Tags from "@/components/main/header/tags";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const revalidate = 0;

export default async function Main() {
  try{
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const tagsData = getMainTags();
  const popularAvatarsData = getMainPopularAvatars();
  const followAvatarsData = user ? getMainFollowAvatars(user.id) : null;
  const recentAvatarsData = getMainRecentAvatars();

  const [tags, popularAvatars, followAvatars, recentAvatars] =
    await Promise.all([
      tagsData,
      popularAvatarsData,
      followAvatarsData,
      recentAvatarsData,
    ]);

  console.log("here home");
  return (
    <div className="relative flex flex-col h-auto min-h-screen">
      <Header />
      <div className="relative flex flex-col items-center w-full grow">
        <Suspense
          fallback={<div className="shrink-0 w-full tb:h-[85px] h-[60px]" />}
        >
          <Tags tags={tags} />
        </Suspense>
        <Carousel />
        <Suspense>
          <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] px:pt-[60px] pt-[40px] pb-[80px] space-y-[64px]">
            <Popular avatars={popularAvatars} />
            {user && <Follow avatars={followAvatars} />}
            <Recent avatars={recentAvatars} />
          </div>
        </Suspense>
      </div>
    </div>
  );
  }catch(error){
    console.error("Error fetching home:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}
