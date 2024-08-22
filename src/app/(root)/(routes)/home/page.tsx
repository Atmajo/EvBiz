"use client";

import HomeCard from "@/components/home-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import CreateEventForm from "@/components/create-event-form";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const HomePage = () => {
  const isSmallDevice = useMediaQuery("(min-width: 768px)");

  if (!isSmallDevice) {
    return (
      <section className="space-y-10 px-5 py-10 z-0">
        <Drawer>
          <DrawerTrigger>
            <Button
              variant={"secondary"}
              className="flex justify-center items-center"
            >
              <Plus size={16} className="mr-2" />
              Create new event
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4">
            <DrawerTitle className="text-black text-2xl pb-3">
              Create new event
            </DrawerTitle>
            <CreateEventForm />
          </DrawerContent>
        </Drawer>
        <div className="flex flex-col h-full gap-5 ">
          <HomeCard />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10 px-5 py-10 z-0">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"secondary"}
            className="flex justify-center items-center"
          >
            <Plus size={16} className="mr-2" />
            Create new event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-black">
          <DialogTitle className="text-black text-2xl pb-3">
            Create New Event
          </DialogTitle>
          <div>
            <CreateEventForm />
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-row h-full gap-5 ">
        <HomeCard />
      </div>
    </section>
  );
};

export default HomePage;
