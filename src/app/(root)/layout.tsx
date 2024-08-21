"use client";

import Navbar from "@/components/navar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="" suppressHydrationWarning>
      <Navbar />
      {children}
      <Toaster />
    </main>
  );
}
