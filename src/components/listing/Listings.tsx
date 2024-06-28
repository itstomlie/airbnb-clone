import React from "react";
import LoadingCard from "./LoadingCard";
import { getListings } from "@/actions";
import ListingCard from "./ListingCard";

const Listings = async () => {
  const listings = await getListings();

  return (
    <div className="px-5 lg:px-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {listings.map((listing) => (
        <ListingCard key={listing.id} id={listing.id} />
      ))}
    </div>
  );
};

export default Listings;
