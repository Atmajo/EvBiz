"use client";

import Navbar from "@/components/navar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="" suppressHydrationWarning>
      <Navbar />
      {children}
    </main>
  );
}
