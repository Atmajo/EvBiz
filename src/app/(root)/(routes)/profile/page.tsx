"use client";

import ProfileCard from "@/components/profile-card";
import ProfileTab from "@/components/profile-tab";
import { useUser } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  const { user } = useUser();
  return (
    <section className="flex flex-col justify-center items-center px-4 py-10 h-full">
      <div className="flex mt-20 mb-44">
        <ProfileCard name={user?.fullName!} img={user?.imageUrl!} email={user?.emailAddresses[0].emailAddress!} />
      </div>
      <ProfileTab />
    </section>
  );
};

export default ProfilePage;
