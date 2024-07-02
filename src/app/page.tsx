import CategoryFilter from "@/components/CategoryFilter";
import ListingLoadingPage from "@/components/ListingLoadingPage";
import Listings from "@/components/listing/Listings";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter: string };
}) {
  return (
    <main>
      <CategoryFilter />
      <Suspense key={searchParams?.filter} fallback={<ListingLoadingPage />}>
        <Listings searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
