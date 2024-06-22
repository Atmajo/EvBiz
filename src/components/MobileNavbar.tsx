import Link from "next/link";
import { Button } from "./ui/button";
import { NavData } from "@/data/NavData";
import { SignOutButton } from "@clerk/nextjs";
import { EllipsisVertical, X } from "lucide-react";
import { useContext } from "react";
import { NavbarContext } from "@/provider/NavbarContext";

const MobileNavbar = () => {
  const { isOpen, setOpen } = useContext(NavbarContext);

  return (
    <nav className="relative flex justify-between items-center w-screen px-4 py-3 h-14 border-b">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl bg-gradient-to-tl to-zinc-400 from-slate-800 via-gray-900 bg-clip-text text-transparent">
        EvBiz
      </h1>
      <EllipsisVertical className="w-6 h-6" onClick={() => setOpen(true)} />
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-[200px] space-y-4 z-40 bg-gradient-to-tl from-slate-300 to-gray-400 transition">
          <div className="flex justify-end items-center px-4 py-3">
            <X className="w-6 h-6" onClick={() => setOpen(false)} />
          </div>
          <div className="flex flex-col justify-start space-y-4 mt-5">
            {NavData.map(({ id, title, url }) => (
              <Link key={id} href={url}>
                <Button variant="link">{title}</Button>
              </Link>
            ))}
          </div>
          <Button variant="link">
            <SignOutButton />
          </Button>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
