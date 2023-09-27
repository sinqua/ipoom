import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex h-auto text-[#333333]">
        <Navbar />
        <div className="relative flex flex-col grow h-auto">
          {children}
          <Footer />
        </div>
      </div>
      {modal}
      <Toaster />
    </>
  );
}
