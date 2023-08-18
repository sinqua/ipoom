import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Header from "@/components/edit/header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.id !== params.user) {
    if (process.env.NEXT_PUBLIC_ENV === "Production")
      throw new Error("Unauthorized");
  }

  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      {children}
    </div>
  );
}
