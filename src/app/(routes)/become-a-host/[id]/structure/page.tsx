"use client";

import { inputCategory } from "@/actions";
import BottomBar from "@/components/BottomBar";
import { categories } from "@/constants/categories";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const StructurePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("icons");
  const { id: listingId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center mb-32">
      <div className="w-[50%]">
        <h2 className="text-3xl font-medium py-5">
          Which of these best describes your place?
        </h2>

        <form action={inputCategory}>
          <input type="hidden" name="category" value={selectedCategory} />
          <input type="hidden" name="listingId" value={listingId} />
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            {categories.map((item) => (
              <div
                key={item.id}
                className={`px-3 py-5 border rounded-lg space-y-1 cursor-pointer hover:border-black ${
                  selectedCategory === item.name
                    ? "border-black bg-[#f7f7f7]"
                    : ""
                }`}
                onClick={() => setSelectedCategory(item.name)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.id}
                  width={40}
                  height={40}
                />
                <p>{item.title}</p>
              </div>
            ))}
          </div>

          <BottomBar />
        </form>
      </div>
    </div>
  );
};

export default StructurePage;
