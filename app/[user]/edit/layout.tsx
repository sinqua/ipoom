import Footer from "@/components/basic-layout/footer";
import Header from "@/components/edit/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      {children}
    </div>
  );
}
