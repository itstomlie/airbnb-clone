import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/LoginModal";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb Clone - itsTomLie",
  description: "A simple airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <html lang="en">
      <body className={`${inter.className} mb-12`}>
        <Navbar user={user} />
        <Suspense fallback={<div>Loading...</div>}>
          <Modal />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
