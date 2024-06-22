"use client";

import React, { use, useEffect, useState } from "react";
import Event from "@/components/Event";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

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

const EventsPage = () => {
  const [events, setEvents] = useState<EventProps[]>([]);

  const { user } = useUser();

  useEffect(() => {
    async function fetchEvents() {
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
    }
    fetchEvents();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Events
      </h1>
      <p className="text-muted-foreground">View, share and edit your events.</p>

      <div className="mt-10">
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
    </div>
  );
};

export default EventsPage;
