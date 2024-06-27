"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const ViewPage = () => {
  const [event, setEvent] = useState<EventDetailsProps>(
    {} as EventDetailsProps
  );

  const query = useSearchParams().get("eventId");

  useEffect(() => {
    async function fetchEventDetails() {
      const response = await axios.post("/api/events/get-eventDetail", {
        id: query,
      });

      if (response) {
        setEvent(response.data);
      }
    }
    fetchEventDetails();
  }, []);

  const { toast } = useToast();

  const { user } = useUser();

  const handleAnswer = async (e: any) => {
    const answer = e.target.textContent;

    handleSubmit(answer);
  };

  const handleSubmit = async (answer: string) => {
    try {
      const response = await axios.post("/api/events/answer-event", {
        id: query,
        answer: answer,
        clerkId: user?.id!,
      });

      if (response.data.message !== "Error occured") {
        if (answer === "Attending") {
          toast({
            title: "Hoorah!",
            description: "Glad to see you there!",
          });
        } else {
          toast({
            title: "Oh no!",
            description: "Sorry to hear you can't make it.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Oh no! Something went wrong. Please try again later.",
      });
    }
  };

  return (
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
      <div className="mt-5 space-x-2">
        <Button onClick={handleAnswer}>
          <h1>Attending</h1>
        </Button>
        <Button onClick={handleAnswer}>
          <h1>Not Attending</h1>
        </Button>
      </div>
    </div>
  );
};

export default ViewPage;
