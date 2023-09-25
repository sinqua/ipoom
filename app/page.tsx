import Header from "@/components/main/header";
import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/carousel";
import { getAllAvatars } from "@/lib/supabase";
import Follow from "@/components/main/follow";
import Popular from "@/components/main/popular";
import Recent from "@/components/main/recent";

export default async function Main() {
  const avatars = await getAllAvatars();

  return (
    <div className="relative flex h-auto text-[#333333]">
      <Navbar />
      <div className="relative flex flex-col grow h-auto">
        <div className="flex flex-col h-auto min-h-screen">
          <Header />
          <div className="flex flex-col items-center w-full grow">
            <Carousel />
            <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full pt-[60px] pb-[80px] space-y-[64px]">
              <Follow avatars={avatars} />
              <Popular avatars={avatars} />
              <Recent avatars={avatars} />
            </div>
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
}
