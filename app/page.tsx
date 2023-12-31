import Hero from "@/components/landing-page/hero";
import Features from "@/components/landing-page/features";
import Newsletter from "@/components/landing-page/newsletter";
import Header from "@/components/landing-page/ui/header";
import Footer from "@/components/basic-layout/footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        <Hero />
        <Features />
        {/* <FeaturesBlocks /> */}
        {/* <Testimonials /> */}
        <div>
          <Newsletter />
        </div>
        {/* <Banner /> */}
        <Footer />
      </div>
    </>
  );
}
