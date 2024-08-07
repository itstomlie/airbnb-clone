"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import prisma from "./lib/prisma";

export async function login(form: {
  email: string;
  password: string;
  phone: string;
  countryCode: string;
}) {
  const supabase = createClient();

  const user = await prisma.user.findFirst({
    where: {
      email: form.email,
    },
  });

  if (!user) {
    const { data, error } = await supabase.auth.signUp(form);

    if (error) {
      console.log(error);
      redirect("/error");
    }

    await prisma.user.create({
      data: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } else {
    const { error } = await supabase.auth.signInWithPassword(form);

    if (error) {
      console.log(error);
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  return redirect("/");
}

export async function getListings(search: string | null) {
  const listings = await prisma.listing.findMany({
    where: {
      category: search || undefined,
      hasCategory: true,
      hasCoordinates: true,
      hasDescription: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return listings;
}

export async function getOneListing(id: string) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: {
      Reservations: {
        where: {
          listingId: id,
        },
      },
      Host: true,
    },
  });

  return listing;
}

export async function createListing(userId: string) {
  let listing;
  listing = await prisma.listing.findFirst({
    where: {
      hostId: userId,
    },
    select: {
      id: true,
      hasCategory: true,
      hasDescription: true,
      hasCoordinates: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!listing) {
    listing = await prisma.listing.create({
      data: {
        hostId: userId,
      },
    });

    redirect(`/become-a-host/${listing.id}/structure`);
  }

  if (!listing.hasCategory) {
    redirect(`/become-a-host/${listing.id}/structure`);
  } else if (listing.hasCategory && !listing.hasDescription) {
    redirect(`/become-a-host/${listing.id}/description`);
  } else if (
    listing.hasCategory &&
    listing.hasDescription &&
    !listing.hasCoordinates
  ) {
    redirect(`/become-a-host/${listing.id}/location`);
  } else {
    const listing = await prisma.listing.create({
      data: {
        hostId: userId,
      },
    });

    return redirect(`/become-a-host/${listing.id}/structure`);
  }
}

export async function inputCategory(formData: FormData) {
  const category = formData.get("category") as string;
  const listingId = formData.get("listingId") as string;

  const listing = await prisma.listing.update({
    where: { id: listingId },
    data: { category, hasCategory: true },
  });

  return redirect(`/become-a-host/${listing.id}/location`);
}

export async function inputCountry(formData: FormData) {
  const country = formData.get("country") as string;
  const coordinates = formData.get("coordinates") as string;
  const formattedCoordinates = coordinates.split(",");
  const listingId = formData.get("listingId") as string;

  const listing = await prisma.listing.update({
    where: { id: listingId },
    data: { country, coordinates: formattedCoordinates, hasCoordinates: true },
  });

  return redirect(`/become-a-host/${listing.id}/description`);
}

export async function inputDescription({
  name,
  description,
  price,
  guests,
  bedrooms,
  beds,
  bathrooms,
  listingId,
  images,
}: {
  name: string;
  description: string;
  price: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  listingId: string;
  images: string[];
}) {
  await prisma.listing.update({
    where: { id: listingId },
    data: {
      name,
      description,
      price: Number(price),
      guests: Number(guests),
      bedrooms: Number(bedrooms),
      beds: Number(beds),
      bathrooms: Number(bathrooms),
      images,
      hasDescription: true,
    },
  });

  return redirect(`/`);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const listingId = formData.get("listingId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId,
      listingId,
      startDate,
      endDate,
    },
  });

  return redirect("/");
}
