"use client";

import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ForwardIcon } from "lucide-react";

const EditEvent = ({ className }: { className?: string }) => {
  const { toast } = useToast();

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" />
      </div>
      <div className="grid">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" />
      </div>
      <div className="flex gap-5">
        <div>
          <Label>Date</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>Time</Label>
          <Input type="time" />
        </div>
      </div>
      <div>
        <Label>Venue</Label>
        <Input type="text" />
      </div>
      <div>
        <Label>Image</Label>
        <div className="border p-3 rounded-lg">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
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
        <Button type="submit">Save changes</Button>
        <Button>
          <ForwardIcon />
        </Button>
      </div>
    </form>
  );
};

export default EditEvent;
