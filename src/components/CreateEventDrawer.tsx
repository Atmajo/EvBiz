import React, { Dispatch, SetStateAction } from "react";
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
import { Plus } from "lucide-react";
import EventForm from "./EventForm";
import { Button } from "./ui/button";

const CreateEventDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
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
  );
};

export default CreateEventDrawer;
