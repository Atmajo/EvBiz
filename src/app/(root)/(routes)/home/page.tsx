"use client";

import { Plus, Pickaxe } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import ProfileAlert from "@/components/Profile-Alert";
import EventForm from "@/components/EventForm";

interface UserProps {
  id: string;
  email: string;
  name: string | null;
  clerkId: string | null;
  imageUrl: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isUser, setIsUser] = React.useState(false);

  const { user } = useUser();

  React.useEffect(() => {
    async function fetchUser() {
      const response = await axios.post("/api/users/fetch-user", {
        clerkId: user?.id as string,
      });

      if (response.data.message === "User not found") {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
      
    }
    
    fetchUser();
  }, []);
  
  if (isUser) {
    return <ProfileAlert />;
  }
  
  if (isDesktop) {
    return (
      <div className="px-20 pt-9 w-screen">
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 mt-0">
          <div className="flex items-center space-x-5 border h-44 w-full rounded-lg px-10 bg-violet-500/30">
            <Pickaxe className="w-12 h-12 rounded-full p-2 text-violet-700" />
            <h1 className="font-semibold text-3xl lg:text-4xl">Events</h1>
            <p className="font-semibold text-3xl">0</p>
          </div>
          <div className="flex items-center space-x-5 border h-44 w-full rounded-lg px-10 bg-emerald-500/30">
            <Pickaxe className="w-12 h-12 rounded-full p-2 text-emerald-700" />
            <h1 className="font-semibold text-3xl lg:text-4xl">Attended</h1>
            <p className="font-semibold text-3xl">0</p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="absolute bottom-5 right-5">
              <button className="bg-gray-400 rounded-lg p-1">
                <Plus size={32} />
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
              <DialogDescription>
                Create an event and make changes in the events you have created.
              </DialogDescription>
            </DialogHeader>
            <EventForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 mt-0">
        <div className="flex items-center space-x-5 border h-44 w-full rounded-lg px-10 bg-violet-500/30">
          <Pickaxe className="w-12 h-12 rounded-full p-2 text-violet-700" />
          <h1 className="font-semibold text-3xl lg:text-4xl">Events</h1>
          <p className="font-semibold text-3xl">0</p>
        </div>
        <div className="flex items-center space-x-5 border h-44 w-full rounded-lg px-10 bg-emerald-500/30">
          <Pickaxe className="w-12 h-12 rounded-full p-2 text-emerald-700" />
          <h1 className="font-semibold text-3xl lg:text-4xl">Attended</h1>
          <p className="font-semibold text-3xl">0</p>
        </div>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="absolute bottom-20 right-5">
            <button className="bg-gray-400 rounded-lg p-1">
              <Plus size={32} />
            </button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create Event</DrawerTitle>
            <DrawerDescription>
              Create an event and make changes in the events you have created.
            </DrawerDescription>
          </DrawerHeader>
          <EventForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Home;
