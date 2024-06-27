import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import EventForm from "./EventForm";

const CreateEventDialogue = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
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
  );
};

export default CreateEventDialogue;
