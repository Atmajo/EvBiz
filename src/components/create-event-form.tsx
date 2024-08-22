import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CreateEventForm = () => {
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    description: z.string().min(1, {
      message: "Description is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel className="text-black">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="+91 123-456-7890"
                  className="text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel className="text-black">Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="+91 123-456-7890"
                  className="text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isSubmitting ? (
          <Button type="submit">
            Submit
          </Button>
        ) : (
          <Button type="submit" disabled>
            <Loader2 className="animate-spin w-4 h-4 mr-2" />
            Please Wait
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateEventForm;
