import React from "react";
import { getListings } from "@/actions";
import ListingCard from "./ListingCard";

const Listings = async ({
  searchParams,
}: {
  searchParams?: { filter: string };
}) => {
  const listings = await getListings(searchParams?.filter || "");

  return (
    <div className="container px-5 md:px-10 grid md:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default Listings;
