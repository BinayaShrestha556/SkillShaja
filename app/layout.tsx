import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/navbar/main";
import Footer from "@/components/footer/footer";

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
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
