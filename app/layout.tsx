import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/bread/Header";
import { BreadcrumbProvider } from "@/components/bread/BreadcrumbContext";
import { CookieConsent } from "@/components/CookieConsent";

const kosugi = Noto_Sans_JP({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "翠翔祭HP",
  description: "有志の学生一人によって作成されたサイトです。公式なサイトではないためご注意ください。",
  openGraph: {
    title: "翠翔祭HP",
    description: "有志の学生一人によって作成されたサイトです。公式なサイトではないためご注意ください。",
    url: "https://swits.vercel.app/", // あなたのサイトのURLに置き換えてください
    siteName: "翠翔祭HP",
    images: [
      {
        url: "https://swits.vercel.app/og-image.jpg", // プレビューに表示したい画像のURL
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
    description: "有志の学生一人によって作成されたサイトです。公式なサイトではないためご注意ください。",
    images: ["https://swits.vercel.app/twitter-image.jpg"], // Twitter用の画像URL
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
