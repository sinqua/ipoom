import Footer from "@/components/basic-layout/footer";
import Header from "@/components/edit/header";

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
