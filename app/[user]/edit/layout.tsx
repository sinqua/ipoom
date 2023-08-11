import Footer from "@/components/basic-layout/footer";
import Header from "@/components/basic-layout/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
