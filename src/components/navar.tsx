import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Avatar } from "./ui/avatar";
import AvatarProf from "./avatar";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <Link href="/home">
        <h1 className="text-4xl font-extrabold">EvBiz</h1>
      </Link>
      <div className="md:flex items-center gap-10 hidden">
        <Link
          href="/home"
          className="text-lg font-semibold text-muted-foreground hover:text-accent-foreground"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="text-lg font-semibold text-muted-foreground hover:text-accent-foreground"
        >
          Profile
        </Link>
        <AvatarProf />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon size={24} />
          </SheetTrigger>
          <SheetContent className="w-60" side={"left"}>
            <SheetHeader className="flex justify-start items-start">
              <h1 className="text-4xl font-extrabold">Menu</h1>
            </SheetHeader>
            <div className="flex flex-col py-5">
              <Link
                href="/home"
                className="text-lg font-semibold text-muted-foreground hover:text-accent-foreground py-5"
              >
                Home
              </Link>
              <Link
                href="/profile"
                className="text-lg font-semibold text-muted-foreground hover:text-accent-foreground py-5"
              >
                Profile
              </Link>
            </div>
            <SheetFooter>
              <AvatarProf />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
