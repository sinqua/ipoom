import Footer from "@/components/basic-layout/Footer";
import Hamburger from "@/components/basic-layout/Hamburger";
import Navbar from "@/features/Navbar/Navbar";
import Header from "@/features/Edit/Header/Edit.Header";
import ProfileCard from "@/features/Edit/Body/ProfileCard/Edit.Body.ProfileCard";

export default function Page() {
  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Hamburger>
        <Navbar />
      </Hamburger>
      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header />
        {/* <ProfileCard /> */}
        <Footer />
      </div>
    </div>
  );
}
