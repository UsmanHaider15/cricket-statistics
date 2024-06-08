import type { Metadata } from "next";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Libre_Franklin } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "Cricket Statistics",
  description: "Cricket Statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable}>
        <div
          key="1"
          className="flex flex-col min-h-screen mx-auto max-w-screen-xl"
        >
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}
