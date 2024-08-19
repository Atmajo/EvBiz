"use client";

import React from "react";
import ProfileTab from "@/components/profile-tab";
import UpdateCard from "@/components/update-card";
import { useUser } from "@clerk/nextjs";

const UpdatePage = () => {
  const { user } = useUser();
  return (
    <section className="flex flex-col justify-center items-center px-4 py-10 h-full">
      <div className="flex mt-20 mb-44">
        <UpdateCard
          name={user?.fullName!}
          img={user?.imageUrl!}
          email={user?.emailAddresses[0].emailAddress!}
        />
      </div>
      <ProfileTab />
    </section>
  );
};

export default UpdatePage;
