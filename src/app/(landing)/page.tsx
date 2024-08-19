"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 h-screen">
      <nav className="flex justify-between items-center px-4 py-2">
        <Link href="/">
          <h1 className="text-4xl font-extrabold">EvBiz</h1>
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-5">
            <Link href="/sign-in">
              <Button variant={"secondary"}>Sign In</Button>
            </Link>
          </div>
        </SignedOut>
      </nav>
      <div className="flex flex-col justify-center items-center mt-52">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl text-center font-extrabold text-white">
            Welcome to EvBiz
          </h1>
          <p className="text-white">The One Stop to manage your Events</p>
        </div>
        <Link href="/home" className="mt-16">
          <Button>Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
