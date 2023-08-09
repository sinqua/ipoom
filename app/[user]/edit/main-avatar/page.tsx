import Footer from "@/components/basic-layout/footer";
import Hamburger from "@/components/basic-layout/hamburger";
import Navbar from "@/components/navbar";
import Header from "@/components/edit/header/index";
import MainAvatar from "@/components/edit/body/main-avatar";

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
