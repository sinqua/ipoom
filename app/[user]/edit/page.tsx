import Footer from "@/components/basic-layout/footer";
import Hamburger from "@/components/basic-layout/hamburger";
import Navbar from "@/components/navbar";
import Header from "@/components/edit/header";
import ProfileCard from "@/components/edit/body/profile-card";

export default function Page() {
  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      {/* <Hamburger>
      </Hamburger> */}
      <Navbar />

      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header />
        <ProfileCard />
        <Footer />
      </div>
    </div>
  );
}
