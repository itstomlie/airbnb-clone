import React from "react";
import StructurePage from "./structure/page";
import { Button } from "@/components/ui/button";

const BecomeAHost = () => {
  return (
    <>
      <StructurePage />;
      <div className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-white px-5 py-2 lg:px-10 lg:py-5 z-50 border-t border-black">
        <p className="underline font-medium">Back</p>
        <Button size="lg">Next</Button>
      </div>
    </>
  );
};

export default BecomeAHost;
