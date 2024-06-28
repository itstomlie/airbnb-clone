import { getListings } from "@/actions";
import CategoryFilter from "@/components/CategoryFilter";
import Listings from "@/components/listing/Listings";

export default async function Home() {
  return (
    <main>
      <CategoryFilter />
      <Listings />
    </main>
  );
}
