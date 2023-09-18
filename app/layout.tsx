import "./css/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AuthProvider from "@/components/auth-provider";
import GoogleAnalytics from "@/components/google-analytics";
import Discord from "@/components/discord";

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
            <GoogleAnalytics />
            <AuthProvider>
              {children}
              {modal}
            </AuthProvider>
            <Discord />
          </main>
        </Suspense>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "무피 - 3D 캐릭터 커뮤니케이션 플랫폼",
    template: "%s | 무피",
  },
  description: "무피는 3D 캐릭터의 게시 및 커미션 의뢰가 가능한 플랫폼입니다",
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
    "커미션"
  ],
  metadataBase: new URL("https://moopi.offing.me/"),
  openGraph: {
    title: "무피",
    description: "무피는 3D 캐릭터의 게시 및 커미션 의뢰가 가능한 플랫폼입니다",
    url: "https://moopi.offing.me/",
    siteName: "무피",
    images: [
      {
        url: "https://moopi.offing.me/og-image.png",
        width: 600,
        height: 800,
        alt: "무피",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};
