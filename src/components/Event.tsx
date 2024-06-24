"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical, Forward, Pencil, Plus, X } from "lucide-react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import EditEvent from "./EditEvent";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

interface EventCardProps {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  imageUrl?: string;
}

const Event = ({
  id,
  title,
  description,
  date,
  time,
  location,
}: EventCardProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { toast } = useToast();

  if (isDesktop) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{location}</p>
          <p className="text-sm text-muted-foreground">
            {date}
            {date ? " @ " : ""}
            {time}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/events/"+id}>
            <Button variant="ghost">
              <EllipsisVertical size={16} />
            </Button>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pencil size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription>Edit the following event.</DialogDescription>
              </DialogHeader>
              <EditEvent
                title={title}
                description={description}
                id={id}
                date={date}
                time={time}
                location={location}
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{location}</p>
        <p className="text-sm text-muted-foreground">
          {date}
          {date ? " @ " : ""}
          {time}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={"/events/"+id}>
          <Button variant="ghost">
            <EllipsisVertical size={16} />
          </Button>
        </Link>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Pencil size={16} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Create Event</DrawerTitle>
              <DrawerDescription>Edit the following event.</DrawerDescription>
            </DrawerHeader>
            <EditEvent
              title={title}
              description={description}
              id={id}
              date={date}
              time={time}
              location={location}
              className="px-4"
            />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
};

export default Event;
