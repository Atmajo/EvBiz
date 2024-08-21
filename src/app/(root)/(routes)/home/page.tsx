import HomeCard from "@/components/home-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <section className="space-y-10 px-5 py-10 z-0">
      <div className="">
        <Button variant={"secondary"} className="flex justify-center items-center">
          <Plus size={16} className="mr-2" />
          Create new event
        </Button>
      </div>
      <div className="flex md:flex-row flex-col flex-wrap h-full gap-5 ">
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </section>
  );
};

export default HomePage;
