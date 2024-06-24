"use client";

import ContentWrapper from "@/Wrapper/ContentWrapper";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import LinearGradient from "@/components/magicui/linear-gradient";
import { Toaster } from "@/components/ui/toaster";
import { NavbarContext } from "@/provider/NavbarContext";
import {
  ReactNode,
  useState,
} from "react";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen z-0">
      <div className="hidden fixed top-0 md:flex z-10 ">
        <Navbar />
      </div>
      <div className="flex md:hidden z-50">
        <NavbarContext.Provider value={{ isOpen, setOpen }}>
          <MobileNavbar />
        </NavbarContext.Provider>
      </div>
      <ContentWrapper>{children}</ContentWrapper>
      <Toaster />
      <LinearGradient className="h-screen" />
    </div>
  );
};

export default ProfileLayout;
