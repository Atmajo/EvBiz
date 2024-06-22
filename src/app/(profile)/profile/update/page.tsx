"use client";

import Particles from "@/components/magicui/particles";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { clerkClient, createClerkClient } from "@clerk/nextjs/server";
import Confetti from "@/components/magicui/confetti";
import type { ConfettiRef } from "@/components/magicui/confetti";
import { set } from "react-hook-form";

const Profile = () => {
  const { user } = useUser();

  const confettiRef = useRef<ConfettiRef>(null);

  const [form, setForm] = useState({
    phone: "",
    name: "",
    email: "",
    clerkId: "",
    imageUrl: "",
  });

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm((prevState) => ({
      ...prevState,
      phone: user?.phoneNumbers[0]?.phoneNumber! || "",
      name: user?.fullName!,
      email: user?.emailAddresses[0].emailAddress!,
      clerkId: user?.id!,
      imageUrl: user?.imageUrl!,
    }));
  }, [user]);

  const { toast } = useToast();

  async function handleSubmit() {
    console.log(form);
    try {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      setConfetti(true);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while updating your profile",
      });
    } finally {
      setConfetti(false);
    }
  }

  function handleConfetti() {
    if (confetti) {
      confettiRef.current?.fire({});
    }
  }

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="flex flex-col space-y-10 relative z-20 justify-center items-center mt-48 bg-black bg-opacity-10 backdrop-blur-sm rounded-md w-[300px] md:w-[50%] py-10">
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
          <div className="flex space-x-28 mt-8">
            <div className="flex items-center justify-center space-x-3">
              <Label>
                <PhoneCall className="text-muted-foreground h-5 w-5" />
              </Label>
              <Input
                className="bg-gray-200/20 border border-black"
                value={form.phone}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleSubmit}>
              <CheckIcon className="w-5 h-5 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>
      {confetti && (
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 h-full w-full"
        />
      )}
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
