"use client";

import { inputCountry } from "@/actions";
import BottomBar from "@/components/BottomBar";
import MapboxCountry from "@/components/MapboxCountry";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const LocationPage = () => {
  const [country, setCountry] = useState("");
  const { id: listingId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center mb-40">
      <div className="w-[50%] space-y-5 py-5">
        <div className="space-y-2">
          <h2 className="text-3xl font-medium ">
            What country is your place located?
          </h2>
          <p className="text-secondary-foreground">
            Your address is only shared with guests after they&apos;ve made a
            reservation.
          </p>
        </div>

        <form action={inputCountry} className="relative">
          <input type="hidden" name="country" value={country} />
          <input type="hidden" name="listingId" value={listingId} />

          <MapboxCountry setCountry={setCountry} />
          <BottomBar />
        </form>
      </div>
    </div>
  );
};

export default LocationPage;
