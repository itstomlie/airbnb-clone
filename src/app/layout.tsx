import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Modal from "@/components/LoginModal";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb Clone - itsTomLie",
  description: "A simple airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} mb-12`}>
        <NavbarWrapper />
        <Modal />
        {children}
      </body>
    </html>
  );
}
