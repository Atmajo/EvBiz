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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import axios from "axios";
import { otps } from "./otp-gen/otps";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

const UpdateForm = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["phone", "otp"]);

  const { user } = useUser();

  const formSchema = z.object({
    phone: z.string().max(10, {
      message: "Username must be at least 10 digits.",
    }),
    // github: z.string().url({ message: "Please enter a valid URL." }),
    // fb: z.string().url({ message: "Please enter a valid URL." }),
    // ig: z.string().url({ message: "Please enter a valid URL." }),
    // twitter: z.string().url({ message: "Please enter a valid URL." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.phone);
    let otp = otps();
    setCookie("phone", values.phone, { path: "/" });
    setCookie("otp", otp, { path: "/" });
    try {
      const res = await axios.post("/api/mail", {
        email: user?.emailAddresses[0].emailAddress,
        msg: otp,
      });
      if (res.data.msgId) {
        router.push("/profile/update/verify");
      } else {
        console.log("Backend error");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-start items-start">
                <FormLabel className="text-white">Phone No.</FormLabel>
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
            <Button type="submit" variant={"secondary"}>
              Submit
            </Button>
          ) : (
            <Button type="submit" variant={"secondary"}>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Please Wait
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UpdateForm;
