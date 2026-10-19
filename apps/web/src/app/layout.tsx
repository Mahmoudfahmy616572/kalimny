import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { Suspense } from "react";

import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";

import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "كلمني | تعلّم اللغات بالمحادثة",
  description:
    "كلمني — منصة تعلّم اللغات عبر محادثة صوتية حقيقية مع مدرّس ذكاء اصطناعي يتكلم معك كإنسان.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabic.variable} ${latin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso font-sans">
        {/* قراءة الجلسة بتتعمل داخل حدود Suspense (مطلوب مع Cache Components) */}
        <Suspense fallback={<SiteHeaderFallback />}>
          <SiteHeader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
