import Header from "@/components/home/header";
import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Carousel from "@/components/carousel";

import Follow from "@/components/home/follow";
import Popular from "@/components/home/popular";
import Recent from "@/components/home/recent";
import { Suspense } from "react";
import Tags from "@/components/home/header/tags";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from 'next/cache'
export const revalidate = 0;

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  revalidatePath("/home")
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
