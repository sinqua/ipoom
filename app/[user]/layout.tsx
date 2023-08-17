import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const session = await getServerSession(authOptions);

  if (session!.user.id !== params.user) {
    if (process.env.NEXT_PUBLIC_ENV === "Production")
      throw new Error("Unauthorized");
  }

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
