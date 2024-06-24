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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import ProfileAlert from "@/components/Profile-Alert";

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

function EventForm({ className }: React.ComponentProps<"form">) {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    email: "",
  });

  const { toast } = useToast();

  const { user } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      email: user?.emailAddresses[0].emailAddress!,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", form);

      if (response) {
        toast({
          title: "Event created",
          description: "Event has been created successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occured while creating the event",
      });
    }
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="name">Event Name</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Sommer Fest"
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Sommer Fest organised in the USA"
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit}>Create</Button>
    </form>
  );
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState<UserProps>({} as UserProps);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { user } = useUser();

  React.useEffect(() => {
    async function fetchUser() {
      const response = await axios.post("/api/users/fetch-user", { clerkId: user?.id! });

      if (response.status === 200) {
        setUserDetails(response.data);
      }
    }

    fetchUser();
  }, [])

  if (!userDetails) {
    return <ProfileAlert />
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
