import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";

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

export default EventForm;