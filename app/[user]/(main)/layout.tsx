import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/user/header";
import ProfileCard from "@/components/user/profile-card";

import { Suspense } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  return (
    <div className="flex flex-col h-auto min-h-screen">
      <Header />
      <Suspense>
        <div className="flex justify-center w-full grow dt:px-0 ph:px-[16px] ph:py-[40px]">
          <div className="relative flex ph:flex-row flex-col-reverse  dt:max-w-[1008px] w-full h-full dt:space-x-[64px] ph:space-x-[32px] space-x-0">
            {children}
            <ProfileCard userID={params.user} />
          </div>
        </div>
      </Suspense>
      <Toaster />
    </div>
  );
}
