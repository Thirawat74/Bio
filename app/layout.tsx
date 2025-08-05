import { Analytics } from "@vercel/analytics/react"
import Alert from "@/components/alert";
import Footer from "@/components/footer";

import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";

const font = IBM_Plex_Sans_Thai({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thirawat - bio",
  description: '" web bio "',
  openGraph: {
    title: "Thirawat - bio",
    type: "website",
    url: "https://thirawatkubb.vercel.app",
    description: '" bio-thirawat"',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full dark" suppressHydrationWarning>
      <body className={`${font.className} relative h-full antialiased`}>
        <Alert />

        {children}

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
