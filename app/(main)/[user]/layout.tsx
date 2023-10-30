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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
