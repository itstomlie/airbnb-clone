import React from "react";
import LoadingCard from "./LoadingCard";

const Listings = () => {
  return (
    <div className="px-5 lg:px-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
};

export default Listings;
