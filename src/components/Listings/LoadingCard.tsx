import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="w-full h-64" />
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-2/3 h-2" />
        <Skeleton className="w-1/3 h-3" />
      </div>
    </div>
  );
};

export default LoadingCard;
