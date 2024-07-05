import { createReservation, getOneListing } from "@/actions";
import BackButton from "@/components/BackButton";
import ImageGallery from "@/components/ImageGallery";
import MapOnly from "@/components/MapOnly";
import Reservation from "@/components/Reservation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { Dot, Heart, ImageOff, Share, User, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const RoomDetailPage = async ({ params }: { params: { id: string } }) => {
  const listing = await getOneListing(params.id);

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="absolute flex w-full p-3 justify-between z-10">
          <BackButton />

          <div className="flex space-x-3">
            <button className="rounded-full bg-white p-1">
              <Share size={15} />
            </button>
            <button className="rounded-full bg-white p-1">
              <Heart size={15} />
            </button>
          </div>
        </div>

        <div>
          {listing?.images && listing.images.length > 0 ? (
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
                      className="w-full h-60 object-cover"
                      src={imageUrl}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <ImageOff />
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="container hidden md:block p-5 lg:px-10">
        <div className="flex justify-between items-center pb-5">
          <h2 className="text-2xl font-medium">{listing?.name}</h2>
          <div className="flex space-x-5">
            <div className="flex items-center space-x-1">
              <Share size={14} strokeWidth={1.5} />
              <p className="underline text-sm">Share</p>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={14} strokeWidth={1.5} />
              <p className="underline text-sm">Save</p>
            </div>
          </div>
        </div>
        <ImageGallery images={listing?.images} />
      </div>

      {/* All View */}
      <div className="container md:flex md:gap-10 p-5 lg:px-10 h-screen">
        <div className="w-full h-full">
          <div className="pb-5">
            <p className="text-lg font-medium">{listing?.country}</p>
            <div className="flex items-center space-x-0.5 text-sm ">
              <p>{listing?.guests} guests</p>
              <Dot size={10} />
              <p>{listing?.bedrooms} bedrooms</p>
              <Dot size={10} />
              <p>{listing?.beds} beds</p>
              <Dot size={10} />
              <p>{listing?.bathrooms} bathrooms</p>
            </div>
          </div>
          <Separator />
          <div className="py-5 flex items-center space-x-5">
            <div
              className={`rounded-full p-2 ${
                data.user ? "bg-primary" : "bg-black"
              }`}
            >
              <UserIcon color="white" />
            </div>
            <div className="flex flex-col justify-center text-sm ">
              <p>Hosted by {listing?.Host?.email}</p>
              <p className="font-light text-secondary-foreground">
                TikTok Creator
              </p>
            </div>
          </div>
          <Separator />

          <div className="py-5 w-full tracking-wide text-muted-foreground text-sm">
            {listing?.description}
          </div>
          <div className="relative w-full h-full">
            <MapOnly coordinates={listing?.coordinates} />
          </div>
        </div>
        <form className="min-h-[150vh]" action={createReservation}>
          <input type="hidden" name="listingId" value={params.id} />
          <input type="hidden" name="userId" value={data.user?.id} />
          <Reservation
            user={data.user}
            reservations={listing?.Reservations}
            price={listing?.price}
          />
        </form>
      </div>
    </>
  );
};

export default RoomDetailPage;
