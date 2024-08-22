import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditEventForm from "./edit-event-form";

const HomeCard = () => {
  const isSmallDevice = useMediaQuery("(min-width: 768px)");

  if (!isSmallDevice) {
    return (
      <Card className="">
        <CardContent className="p-5">
          <h1 className="text-2xl font-bold">Home Card</h1>
          <p className="text-gray-500">This is a card component</p>
          <p className="text-muted-foreground text-sm mt-1">10:00 A.M.</p>
          <p className="text-muted-foreground text-sm">TX, USA</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="btn btn-primary">View Event</Button>
          <Drawer>
            <DrawerTrigger>
              <Button className="btn btn-primary" variant={"outline"}>
                Edit
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
              <DrawerTitle className="text-black text-2xl pb-3">
                Edit event
              </DrawerTitle>
              <EditEventForm />
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="">
      <CardContent className="p-5">
        <h1 className="text-2xl font-bold">Home Card</h1>
        <p className="text-gray-500">This is a card component</p>
        <p className="text-muted-foreground text-sm mt-1">10:00 A.M.</p>
        <p className="text-muted-foreground text-sm">TX, USA</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="btn btn-primary">View Event</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn btn-primary" variant={"outline"}>
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] text-black">
            <DialogTitle className="text-black text-2xl pb-3">
              Edit Event
            </DialogTitle>
            <div>
              <EditEventForm />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default HomeCard;
