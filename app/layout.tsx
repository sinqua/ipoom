import "./css/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AuthProvider from "@/components/auth-provider";
import GoogleAnalytics from "@/components/google-analytics";
import Discord from "@/components/discord";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/basic-layout/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <main>
            {/* <GoogleAnalytics /> */}
            <AuthProvider>
              <div className="relative flex h-auto">
                <Navbar />
                <div className="relative flex flex-col grow h-auto">
                  {children}
                  <Footer />
                </div>
              </div>
              {modal}
            </AuthProvider>
            <Toaster />
            <Discord />
          </main>
        </Suspense>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "무피 - 3D 아바타 커뮤니케이션 플랫폼",
    template: "%s | 무피",
  },
  description:
    "당신이 만든 캐릭터가 더 많은 사람을 만나는 무피. 어떤 기기에서도 생동감 있고 자연스러운 캐릭터를 보여줍니다.",
  applicationName: "무피",
  keywords: [
    "3D",
    "크리에이터",
    "포트폴리오",
    "무피",
    "메타버스",
    "Creator",
    "Portfolio",
    "Moopi",
    "VRChat",
    "VRM",
    "VRC",
    "커미션",
  ],
  metadataBase: new URL("https://moopi.offing.me/"),
  openGraph: {
    title: "무피 - 3D 아바타 커뮤니케이션 플랫폼",
    description:
      "당신이 만든 캐릭터가 더 많은 사람을 만나는 무피. 어떤 기기에서도 생동감 있고 자연스러운 캐릭터를 보여줍니다.",
    url: "https://moopi.offing.me/",
    siteName: "무피",
    images: [
      {
        url: "https://moopi.offing.me/og-image.png",
        width: 600,
        height: 600,
        alt: "무피",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};
