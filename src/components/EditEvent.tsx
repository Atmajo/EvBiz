"use client";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ForwardIcon } from "lucide-react";
import axios from "axios";
import { useState } from "react";

interface EditEventProps {
  className?: string;
  title: string;
  description?: string;
  id: string;
  date?: string;
  time?: string;
  location?: string;
}

const EditEvent = ({
  className,
  title,
  description,
  id,
  date,
  time,
  location,
}: EditEventProps) => {
  const [form, setForm] = useState({
    id: id,
    title: title || "",
    description: description || "",
    date: date || "",
    time: time || "",
    location: location || "",
    imageUrl: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post("/api/events/update", form);

      if (response.data.message === "Event updated") {
        toast({
          title: "Event updated",
          description: "Your event has been updated successfully.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        description: "Your event has not been updated.",
      });
    }
  };

  const data = [
    (title = title),
    (description = description),
    (date = date),
    (time = time),
    (location = location),
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value.length > 0 ? value : data[name],
    });
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          defaultValue={title}
        />
      </div>
      <div className="grid">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          onChange={handleChange}
          defaultValue={description}
        />
      </div>
      <div className="flex gap-5">
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            defaultValue={date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Time</Label>
          <Input
            type="time"
            name="time"
            defaultValue={time}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <Label>Venue</Label>
        <Input
          type="text"
          name="location"
          defaultValue={location}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Image</Label>
        <div className="border p-3 rounded-lg">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setForm({ ...form, imageUrl: res[0]?.url });
              toast({
                title: "Upload completed",
                description: "Your image has been uploaded successfully.",
              });
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Error Occured",
                description: "Your image has not been uploaded.",
              });
            }}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="submit" onClick={handleSubmit}>
          Save changes
        </Button>
        <Button>
          <ForwardIcon />
        </Button>
      </div>
    </form>
  );
};

export default EditEvent;
