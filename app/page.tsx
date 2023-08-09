import Navbar from "@/components/basic-layout/navbar";
import Header from "@/components/basic-layout/header";
import dynamic from "next/dynamic";
import Hamburger from "@/components/basic-layout/hamburger";

const Discord = dynamic(() => import("@/components/discord"), { ssr: false });

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
