import React from "react";
import UploadThingComponent from "@/components/UploadThingComponent";
import Event from "@/components/Event";

const EventsPage = () => {
  return (
    <div className="mt-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Events
      </h1>
      <p className="text-muted-foreground">View, share and edit your events.</p>
      <div className="mt-10">
        <Event
          title="Summer Fest"
          description="A summer fest of the USA"
          location="TX, USA"
          date="2024-08-14"
          time="10:00 A.M."
        />
      </div>
    </div>
  );
};

export default EventsPage;
