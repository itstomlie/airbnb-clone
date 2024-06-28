import { Progress } from "@radix-ui/react-progress";
import React from "react";
import { Button } from "./ui/button";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-50 border-black space-y-3 xl:space-y-5">
      <Progress value={15} className="rounded-none h-2 bg-[#f7f7f7]" />

      <div className="flex justify-between items-center px-5 pb-1 lg:px-10 lg:pb-3 xl:pb-5">
        <p className="underline font-medium">Back</p>
        <Button size="lg" type="submit">
          Next
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
