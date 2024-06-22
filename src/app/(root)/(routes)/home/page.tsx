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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Event Name</Label>
        <Input type="text" id="email" name="name" placeholder="Sommer Fest" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" name="description" placeholder="Sommer Fest organised in the USA" />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="px-20 pt-9 w-screen">
        {/* <ProfileAlert /> */}
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
            <ProfileForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div className="absolute bottom-5 right-5">
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
          <ProfileForm className="px-4" />
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
