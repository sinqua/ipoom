import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import Header from "@/components/basic-layout/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Navbar />
      <div className="relative flex flex-col grow h-auto min-h-full">
        {children}
        <Footer />
      </div>
    </div>
  );
}
