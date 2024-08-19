"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const AvatarProf = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center gap-4 bg-white border rounded-md px-4 py-2">
      <UserButton />
      <div className="flex flex-col">
        <h1 className="text-sm">{user?.firstName}</h1>
        <p className="text-sm text-muted-foreground font-extralight">{"user"}</p>
      </div>
    </div>
  );
};

export default AvatarProf;
