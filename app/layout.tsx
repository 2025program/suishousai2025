import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
//import Header from "@/components/bread/Header";
//import { BreadcrumbProvider } from "@/components/bread/BreadcrumbContext";
//もし使うときはcookieなどにも注意してください
import { CookieConsent } from "@/components/CookieConsent";
import HamburgerMenu from "@/components/HamburgerMenu";

const kosugi = Noto_Sans_JP({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "翠翔祭HP",
  description: "翠翔祭2025の公式サイトです。有益な情報を公開しています!",
  openGraph: {
    title: "翠翔祭HP",
    description: "翠翔祭2025の公式サイトです。有益な情報を公開しています!",
    url: "https://suishousai2025.vercel.app/", // あなたのサイトのURLに置き換えてください
    siteName: "翠翔祭HP",
    images: [
      {
        url: "https://suishousai2025.vercel.app/og-image.jpg", // プレビューに表示したい画像のURL
        width: 1200,
        height: 630,
        alt: "翠翔祭HPのプレビュー画像",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "翠翔祭HP",
    description: "横浜翠嵐高等学校",
    images: ["https://suishousai2025.vercel.app/twitter-image.jpg"], // Twitter用の画像URL
  },
  // 他にも必要に応じて設定可能
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={kosugi.className}>
        <HamburgerMenu />
        <main>
          {children}
        </main>
        <CookieConsent />
      </body>
    </html>
  );
}

//没になったUI
//<BreadcrumbProvider>
//<main>
//  <Header>{children}</Header>
//</main>
//</BreadcrumbProvider>
