"use client";

import Particles from "@/components/magicui/particles";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className="relative flex justify-center items-center w-screen z-0">
      <div className="flex flex-col space-y-10 z-10 justify-center items-center mt-48 bg-black bg-opacity-10 backdrop-blur-sm rounded-md w-[300px] md:w-[50%] lg:w-[50%] py-10">
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
            <div className="flex flex-col justify-center items-center space-y-2">
              <span className="text-2xl text-muted-foreground font-semibold">
                0
              </span>
              <span className="text-sm text-muted-foreground">Events</span>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <span className="text-2xl text-muted-foreground font-semibold">
                0
              </span>
              <span className="text-sm text-muted-foreground">Attended</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/profile/update">
              <Button>
                Update
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
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
