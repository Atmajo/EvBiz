"use client";

import { Plus, Pickaxe } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Event from "@/components/Event";
import { useUser } from "@clerk/nextjs";
import ProfileAlert from "@/components/Profile-Alert";
import CreateEventDialogue from "@/components/CreateEventDialogue";
import CreateEventDrawer from "@/components/CreateEventDrawer";

interface EventProps {
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

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [events, setEvents] = React.useState<EventProps[]>([]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isUser, setIsUser] = React.useState(false);

  const { user } = useUser();
  
  React.useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.post("/api/events/get-events", {
        clerkId: user?.id!,
      });
      const fetchedEvents = Array.isArray(response.data.event)
        ? response.data.event
        : [];
      setEvents(fetchedEvents);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    async function fetchUser() {
      const response = await axios.post("/api/users/fetch-user", {
        clerkId: user?.id as string,
      });

      if (
        response.data.message === "User not found" ||
        response.data.message === "Error occured"
      ) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }

    fetchUser();
  }, []);

  if (isUser) {
    return (
      <div className="mt-5">
        <ProfileAlert />
      </div>
    );
  }

  if (isDesktop) {
    return (
      <div className="pt-9 w-screen">
        <div className="w-screen flex space-x-2 overflow-y-scroll">
          {events.length === 0 && (
            <div>
              <p className="text-muted-foreground">No events found.</p>
            </div>
          )}
          {events.map((event: any) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              location={event.location}
              date={event.date}
              time={event.time}
            />
          ))}
        </div>
        <CreateEventDialogue open={open} setOpen={setOpen} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-0 w-screen flex flex-col md:space-x-2 space-y-1 overflow-y-scroll">
        {events.length === 0 && (
          <div>
            <p className="text-muted-foreground">No events found.</p>
          </div>
        )}
        {events.map((event: any) => (
          <Event
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            location={event.location}
            date={event.date}
            time={event.time}
          />
        ))}
      </div>
      <CreateEventDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Home;
