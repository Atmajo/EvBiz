"use client";

import Particles from "@/components/magicui/particles";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { InputOTPForm } from "@/components/InputOTP";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";

const Profile = () => {
  const { user } = useUser();

  const [verify, setVerify] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    clerkId: "",
    imageUrl: "",
  });

  const { toast } = useToast();

  async function onSubmit() {
    try {
      const response = await axios.post("/api/users", form);
      if (response?.data?.message === "User created") {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile",
      });
    } finally {
    }
  }

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      phone: e.target.value,
      name: user?.fullName!,
      email: user?.emailAddresses[0].emailAddress!,
      clerkId: user?.id!,
      imageUrl: user?.imageUrl!,
    }));
  };

  const FormSchema = z.object({
    phone: z.string().min(10, {
      message: "Your phone number must be 10.",
    }),
    name: z.string(),
    email: z.string().email(),
    clerkId: z.string(),
    imageUrl: z.string(),
  });

  const formField = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      phone: "",
      name: user?.fullName!,
      email: user?.emailAddresses[0].emailAddress!,
      clerkId: user?.id!,
      imageUrl: user?.imageUrl!,
    },
    defaultValues: {
      phone: "",
    },
  });

  return (
    <div className="flex justify-center items-center w-screen z-0">
      <div className="flex flex-col space-y-10 relative z-20 justify-center items-center mt-48 bg-gray-900 bg-opacity-15 backdrop-blur-sm rounded-md w-[300px] md:w-[50%] py-10">
        {user?.imageUrl ? (
          <Image
            src={user?.imageUrl as string}
            width={200}
            height={200}
            alt="profile image"
            loading="lazy"
            className="-mt-32 shadow-xl rounded-full"
          />
        ) : (
          <Skeleton className="h-[200px] w-[200px] rounded-full -mt-32" />
        )}
        <div className="flex flex-col items-center">
          {user?.fullName! ? (
            <h1 className="text-3xl text-center font-semibold text-muted-foreground">
              {user?.fullName!}
            </h1>
          ) : (
            <Skeleton className="h-8 w-72" />
          )}
          {user?.emailAddresses[0].emailAddress ? (
            <p className="text-sm md:text-lg text-center font-semibold text-muted-foreground mt-2">
              {user?.emailAddresses[0].emailAddress}
            </p>
          ) : (
            <Skeleton className="h-8 w-64 mt-2 align-middle" />
          )}

          <Form {...formField}>
            <form
              onSubmit={formField.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={formField.control}
                name="phone"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <div className="flex space-x-28 mt-8">
                      <div className="flex items-center justify-center space-x-3">
                        <Label>
                          <PhoneCall className="text-muted-foreground h-5 w-5" />
                        </Label>
                        <Input
                          className="bg-gray-200/20 border border-black"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div className="mt-6">
                <Button
                  onClick={() => {
                    setVerify(true);
                  }}
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={80}
        color={"#00000"}
        refresh
      />
    </div>
  );
};

export default Profile;
