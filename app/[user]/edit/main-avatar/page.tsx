import Footer from "@/components/basic-layout/Footer";
import Hamburger from "@/components/basic-layout/Hamburger";
import Navbar from "@/features/Navbar/Navbar";
import Header from "@/features/Edit/Header/Edit.Header";
import MainAvatar from "@/features/Edit/Body/MainAvatar/Edit.Body.MainAvatar";

export default function Page() {
  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Hamburger>
        <Navbar />
      </Hamburger>
      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header />
        <MainAvatar />
        <Footer />
      </div>
    </div>
  );
}
