import Footer from "@/components/basic-layout/footer";
import Hamburger from "@/components/basic-layout/hamburger";
import Navbar from "@/components/navbar";
import Header from "@/components/edit/header";
import Thumbnail from "@/components/edit/body/profile-card/thumbnail";
import Nickname from "@/components/edit/body/profile-card/nickname";
import Kakao from "@/components/edit/body/profile-card/kakao";
import Toss from "@/components/edit/body/profile-card/toss";
import Tags from "@/components/edit/body/profile-card/tags";

export default function Page() {
  return (
    <div className="relative flex flex-col grow h-auto min-h-full">
      <Header />
      <div className="flex justify-center w-full grow dt:px-0 px-[16px] py-[40px]">
        <div className="relative flex flex-col dt:max-w-[1008px] w-full h-full space-y-[64px]">
          <Thumbnail />
          <Nickname />
          <Kakao />
          <Toss />
          <Tags />
        </div>
      </div>
      <Footer />
    </div>
  );
}
