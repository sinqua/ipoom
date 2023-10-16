import Hero from "@/components/landing-page/hero";
import Features from "@/components/landing-page/features";
import FeaturesBlocks from "@/components/landing-page/features-blocks";
import Testimonials from "@/components/landing-page/testimonials";
import Newsletter from "@/components/landing-page/newsletter";
import Header from "@/components/landing-page/ui/header";
import Banner from "@/components/landing-page/banner";
import Footer from "@/components/basic-layout/footer";

import { cookies } from 'next/headers'
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { useSearchParams } from "next/navigation";
import { Database } from "@/lib/database.types";

export default function Home() {
  // const searchParams = useSearchParams();
  // const code = searchParams.get('code')

  // if (code) {
  //   const cookieStore = cookies()
  //   const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  //   await supabase.auth.exchangeCodeForSession(code)
  // }


  // const cookieStore = cookies()
  // const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // // const { data } = await supabase.from('todos').select()
  // const { data, error } = await supabase.auth.getSession()
  // const { data: { user } } = await supabase.auth.getUser()

  // console.log("cookieStore", cookieStore);
  // // console.log("supabase", supabase);
  // console.log("data", data);
  // console.log("user", user);


  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        <Hero />
        <Features />
        {/* <FeaturesBlocks /> */}
        {/* <Testimonials /> */}
        <div>
          {/* <Newsletter /> */}
        </div>
        {/* <Banner /> */}
        <Footer />
      </div>
    </>
  );
}
