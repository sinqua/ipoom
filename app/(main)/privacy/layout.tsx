import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-auto text-[#333333]">
      <Navbar />
      <div className="relative flex flex-col grow h-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
}
