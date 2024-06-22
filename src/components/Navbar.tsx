import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { NavData } from "@/data/NavData";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-screen px-4 py-3 h-14 border-b">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl bg-gradient-to-tl to-zinc-400 from-slate-800 via-gray-900 bg-clip-text text-transparent">
        EvBiz
      </h1>
      <div className="flex space-x-4">
        {NavData.map(({ id, title, url }) => (
          <Link key={id} href={url}>
            <Button variant="link">{title}</Button>
          </Link>
        ))}
        <Button variant="link">
          <SignOutButton />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
