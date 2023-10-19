import type { Metadata } from "next";
import { Suspense } from "react";
// import AuthProvider from "@/components/auth-provider";
import GoogleAnalytics from "@/components/google-analytics";
import Discord from "@/components/discord";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/basic-layout/footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const childProp = (children as React.ReactElement<any>).props.childProp;

  const { current, segment } = childProp;
  
  console.log("레이아웃 여섯번째 Current : ", current);
  console.log("레이아웃 여섯번째 Segment : ", segment);
  
  return (
    <div className="relative flex h-auto">
      <Navbar />
      <div className="relative flex flex-col grow h-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
}