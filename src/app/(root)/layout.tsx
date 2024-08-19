import Navbar from "@/components/navar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <Navbar />
      {children}
    </main>
  );
}
