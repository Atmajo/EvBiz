"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  EmailShare,
  WhatsappShare,
  FacebookShare,
  TwitterShare,
} from "react-share-kit";
import ClipboardJS from "clipboard";

new ClipboardJS(".copy");

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { CopyIcon, ForwardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

interface EventDetailsProps {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  imageUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const SpecificEventPage = ({ params }: { params: { eventId: string } }) => {
  const [event, setEvent] = useState<EventDetailsProps>(
    {} as EventDetailsProps
  );
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function fetchEventDetails() {
      const response = await axios.post("/api/events/get-eventDetail", {
        id: params.eventId,
      });

      if (response) {
        setEvent(response.data);
      }
    }
    fetchEventDetails();
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const EventComponent = (
    <div className="lg:mt-5">
      {event.imageUrl !== null && (
        <div className="">
          <Image
            src={event.imageUrl as string}
            width={1080}
            height={0}
            alt="image"
            className="w-[1920px] h-[300px]"
          />
        </div>
      )}
      <div className="mt-2">
        <h1 className="font-bold text-lg">{event.title}</h1>
        <p className="font-semibold">{event.description}</p>
        <p className="font-light mt-2">{event.location}</p>
        <div className="flex space-x-2 text-muted-foreground">
          <h1>{event.date}</h1>
          <h1>{event.date && "@"}</h1>
          <h1>{event.time}</h1>
        </div>
      </div>
    </div>
  );

  const pathName = usePathname();

  const shareLink = `https://evbiz.vercel.app${pathName}/view?eventId=${params.eventId}`;

  const ShareComponent = (
    <div className="px-4 py-6 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input id="link" defaultValue={shareLink} readOnly />
        </div>
        <Button
          type="submit"
          size="sm"
          className="p-4 copy"
          data-clipboard-action="copy"
          data-clipboard-target="#link"
        >
          <span className="sr-only">Copy</span>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-2">
        <FacebookShare url={shareLink} size={48} borderRadius={10} />
        <WhatsappShare url={shareLink} size={48} borderRadius={10} />
        <TwitterShare url={shareLink} size={48} borderRadius={10} />
        <EmailShare url={shareLink} size={48} borderRadius={10} />
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div>
        {EventComponent}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute md:top-20 top-16 right-5">
              <ForwardIcon size={16} className="text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            {ShareComponent}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      {EventComponent}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="absolute md:top-20 top-16 right-5">
            <ForwardIcon size={16} className="text-white" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Share link</DrawerTitle>
            <DrawerDescription>
              Anyone who has this link will be able to view this.
            </DrawerDescription>
          </DrawerHeader>
          {ShareComponent}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SpecificEventPage;
