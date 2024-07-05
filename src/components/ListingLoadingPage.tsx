import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-full h-60 rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="w-3/4 h-4 " />
        <Skeleton className="w-1/2 h-4 " />
        <Skeleton className="w-1/3 h-4 " />
      </div>
    </div>
  );
}

const ListingLoadingPage = () => {
  return (
    <div className="container px-5 md:px-10 grid md:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default ListingLoadingPage;
