"use client";

import { categories } from "@/constants/categories";
import Image from "next/image";
import React, { useState } from "react";

const StructurePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("icons");
  return (
    <div className="flex flex-col items-center justify-center mb-32">
      <div className="w-[50%]">
        <h2 className="text-3xl font-medium py-5">
          Which of these best describes your place?
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {categories.map((item) => (
            <div
              key={item.id}
              className={`px-3 py-5 border rounded-lg space-y-1 cursor-pointer hover:border-black ${
                selectedCategory === item.name ? "border-black bg-gray-50 " : ""
              }`}
              onClick={() => setSelectedCategory(item.name)}
            >
              <Image src={item.imageUrl} alt={item.id} width={40} height={40} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StructurePage;
