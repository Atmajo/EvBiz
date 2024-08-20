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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import "@/styles/update-card.css";

const formSchema = z.object({
  otp: z.string().max(10, {
    message: "OTP must be of 6 digits",
  }),
});

const UpadteForn = () => {
  const router = useRouter();
  const [cookies] = useCookies(["phone"]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    //if verified then:
    router.push("/profile/update");
  }
  
  return (
    <section className="flex flex-col justify-center items-center mt-32">
      <div className="card">
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start items-start">
                    <FormLabel className="text-white">Verify OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="text-white" />
                          <InputOTPSlot index={1} className="text-white" />
                          <InputOTPSlot index={2} className="text-white" />
                          <InputOTPSlot index={3} className="text-white" />
                          <InputOTPSlot index={4} className="text-white" />
                          <InputOTPSlot index={5} className="text-white" />
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
        </div>
      </div>
    </section>
  );
};

export default UpadteForn;
