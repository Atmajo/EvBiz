import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Avatar } from "./ui/avatar";
import AvatarProf from "./avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <Link href="/home">
        <h1 className="text-4xl font-extrabold">EvBiz</h1>
      </Link>
      <div className="md:flex items-center gap-10 hidden">
        <Link
          href="/home"
          className="text-lg font-semibold hover:text-muted-foreground"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="text-lg font-semibold hover:text-muted-foreground"
        >
          Profile
        </Link>
        <Button variant={"secondary"}>
          <SignOutButton />
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon size={24} />
          </SheetTrigger>
          <SheetContent
            className="flex flex-col justify-between w-60 bg-[#191919] border-none"
            side={"left"}
          >
            <div className="flex flex-col py-5">
              <SheetClose asChild>
                <Link
                  href="/home"
                  className="text-lg font-semibold hover:text-muted-foreground py-5"
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/profile"
                  className="text-lg font-semibold hover:text-muted-foreground py-5"
                >
                  Profile
                </Link>
              </SheetClose>
            </div>
            <SheetFooter>
              <Button variant={"secondary"}>
                <SignOutButton />
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
