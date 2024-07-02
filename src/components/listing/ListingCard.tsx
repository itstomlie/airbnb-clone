import { IListing } from "@/interfaces/listing";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ListingCard = ({ listing }: { listing: IListing }) => {
  return (
    <div className="flex flex-col space-y-3">
      {listing.images && listing.images.length > 0 ? (
        <Carousel>
          <CarouselContent className="h-60">
            {listing.images.map((imageUrl) => (
              <CarouselItem key={imageUrl}>
                <Image
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full h-60 object-cover rounded-lg"
                  src={imageUrl}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <ImageOff />
      )}
      <div className="space-y-1">
        <p className="font-medium">{listing.name}</p>
        <p className="text-sm text-secondary-foreground line-clamp-2">
          {listing.description}
        </p>
        <p className="text-sm">USD ${listing.price} per night</p>
      </div>
    </div>
  );
};

export default ListingCard;
