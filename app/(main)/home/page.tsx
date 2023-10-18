import Header from "@/components/main/header";
import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/carousel";

import Follow from "@/components/main/follow";
import Popular from "@/components/main/popular";
import Recent from "@/components/main/recent";

import { Suspense } from "react";
import Tags from "@/components/main/header/tags";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const revalidate = 0;

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-col h-auto min-h-screen">
      <Header />
      <div className="relative flex flex-col items-center w-full grow">
        <Tags />
        <Carousel />
        <Suspense>
          <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full dt:px-0 px-[16px] px:pt-[60px] pt-[40px] pb-[80px] space-y-[64px]">
            <Popular />
            {user && <Follow />}
            <Recent />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
