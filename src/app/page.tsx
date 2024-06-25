import CategoryFilter from "@/components/CategoryFilter";
import Listings from "@/components/Listings/Listings";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <CategoryFilter />
      <Listings />
    </main>
  );
}
