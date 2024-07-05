"use client";

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
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const ListingCard = ({ listing }: { listing: IListing }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Link href={`/rooms/${listing.id}`} className="flex flex-col space-y-3">
      {listing.images && listing.images.length > 0 ? (
        <Carousel
          opts={{
            loop: true,
          }}
        >
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
        <p className="font-medium text-lg">{listing.name}</p>
        <p className="text-sm text-secondary-foreground line-clamp-2">
          {listing.description}
        </p>
        <p className="text-sm">
          <span className="font-medium">USD ${listing.price}</span> night
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
