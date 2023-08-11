import Navbar from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Navbar />
      {children}
    </div>
  );
}
