import type { Metadata } from "next";

import "./globals.css";
import { SessionProvider } from "next-auth/react";

import Navbar from "@/components/navbar/main";
import Footer from "@/components/footer/footer";
import Ai from "@/components/ai/AI";

export const metadata: Metadata = {
  title: "SkillSajha",
  description: "A platform to learn and share skills",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <SessionProvider>
          <Navbar />
          <main className="  min-h-screen">{children}</main>
          <Ai />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
