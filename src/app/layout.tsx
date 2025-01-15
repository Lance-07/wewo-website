import type { Metadata } from "next";
import "./globals.css";
import {mazzard_soft_h, poppins} from "@/app/ui/fonts";
import Navbar from "./ui/components/navbar";

export const metadata: Metadata = {
  title: "WEWO",
  description: "WEWO website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mazzard_soft_h.className} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
