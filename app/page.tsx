import Hero from "@/components/landing-page/hero";
import Features from "@/components/landing-page/features";
import FeaturesBlocks from "@/components/landing-page/features-blocks";
import Testimonials from "@/components/landing-page/testimonials";
import Newsletter from "@/components/landing-page/newsletter";
import Header from "@/components/landing-page/ui/header";
import Banner from "@/components/landing-page/banner";
import Footer from "@/components/basic-layout/footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden antialiased bg-white text-gray-900 tracking-tight supports-[overflow:clip]:overflow-clip">
        <Header />
        <Hero />
        <Features />
        {/* <FeaturesBlocks /> */}
        {/* <Testimonials /> */}
        <div className="">
          <Newsletter />
        </div>
        {/* <Banner /> */}
        <Footer />
      </div>
    </>
  );
}
