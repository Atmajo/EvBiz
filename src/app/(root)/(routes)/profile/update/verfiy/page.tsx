"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
    console.log(values);
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
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
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
