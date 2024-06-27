"use client";

import GithubStarCount from "@/components/GithubStars";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div>
        <Image
          src="/dancing.svg"
          alt="beanhead"
          width={400}
          height={400}
        />
      </div>
      <div className="mt-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center">
          Welcome to{" "}
          <span className="bg-gradient-to-tl to-zinc-400 from-slate-800 via-gray-900 bg-clip-text text-transparent text-6xl">
            EvBiz
          </span>
        </h1>
        <p className="text-xl text-center font-semibold mt-5">
          A first ever Event Management Website
        </p>
      </div>
      <div>
        <Link href="/home">
          <Button className="mt-5 bg-gradient-to-tl to-zinc-400 from-slate-800 via-gray-900 hover:from-slate-900 hover:to-zinc-500 px-5 py-2 rounded-lg text-white font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
