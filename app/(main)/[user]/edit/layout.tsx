import Header from "@/components/edit/header";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  
  console.log("레이아웃 두번째 ", children);
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id !== params.user) {
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
