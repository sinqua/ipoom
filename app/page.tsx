import Navbar from "@/components/basic-layout/Navbar";
import Header from "@/components/basic-layout/Header";
import dynamic from "next/dynamic";
import Hamburger from "@/components/basic-layout/Hamburger";

const Discord = dynamic(() => import("@/components/Discord"), { ssr: false });

export default function Home() {
  return (
    <div className="relative flex h-full min-h-full">
      <Hamburger>
        <Navbar />
      </Hamburger>
      <div className="relative flex flex-col grow h-auto min-h-full">
        <Header />
        <Discord />
      </div>
    </div>
  );
}
