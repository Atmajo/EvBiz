"use client";

import ContentWrapper from "@/Wrapper/ContentWrapper";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LinearGradient from "@/components/magicui/linear-gradient";
import { Toaster } from "@/components/ui/toaster";
import { NavbarContext } from "@/provider/NavbarContext";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SidebarContextType {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col h-screen ">
      <div className="hidden fixed top-0 md:flex z-10 ">
        <Navbar />
      </div>
      <div className="flex md:hidden">
        <NavbarContext.Provider value={{ isOpen, setOpen }}>
          <MobileNavbar />
        </NavbarContext.Provider>
      </div>
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Toaster />
      <LinearGradient className="absolute z-0" />
    </div>
  );
};

export default RootLayout;
