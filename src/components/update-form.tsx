"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const formSchema = z.object({
  phone: z
    .string()
    .min(10, {
      message: "Username must be at least 10 digits.",
    })
    .max(10, {
      message: "Username must be at least 10 digits.",
    }),
  github: z.string().url({ message: "Please enter a valid URL." }),
  fb: z.string().url({ message: "Please enter a valid URL." }),
  ig: z.string().url({ message: "Please enter a valid URL." }),
  twitter: z.string().url({ message: "Please enter a valid URL." }),
});

const UpadteForn = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["phone"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      github: "",
      fb: "",
      ig: "",
      twitter: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.phone);
    // setCookie("phone", values.phone, { path: "/" });
    // router.push("/profile/update/verify");
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel className="text-white">Phone No.</FormLabel>
              <FormControl>
                <Input placeholder="+91 123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"secondary"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UpadteForn;