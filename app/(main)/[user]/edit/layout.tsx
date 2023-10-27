import Header from "@/components/edit/header";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");
  if (session.user.id !== params.user) redirect("/home");

  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      {children}
    </div>
  );
}
