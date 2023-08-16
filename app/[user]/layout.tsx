import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Footer from "@/components/basic-layout/footer";
import Navbar from "@/components/navbar";

export default async function Layout(props: any) {
  const session = await getServerSession(authOptions);

  if (session!.user.id !== props.params.user) {
    if (process.env.NEXT_PUBLIC_ENV === "Production")
      throw new Error("Unauthorized");
  }

  return (
    <div className="relative flex h-full min-h-full text-[#333333]">
      <Navbar />
      <div className="relative flex flex-col grow h-auto min-h-full">
        {props.children}
        <Footer />
      </div>
    </div>
  );
}
