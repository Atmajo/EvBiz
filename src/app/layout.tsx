import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Roboto({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EvBiz",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
