"use client";

import { categories } from "@/constants/categories";
import Image from "next/image";
import React, { useState } from "react";

const CategoryFilter = () => {
  const [category, setCategory] = useState("icons");

  return (
    <div className="container px-5 lg:px-10 py-5 flex gap-x-12 overflow-scroll ">
      {categories.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col justify-center items-center border-black text-secondary pb-2 gap-y-2 cursor-pointer group hover:text-black hover:border-b-2 hover:border-opacity-10 ${
            category === item.name &&
            "border-b-2  text-black hover:border-opacity-100"
          }`}
          onClick={() => setCategory(item.name)}
        >
          <Image
            alt={item.title}
            src={item.imageUrl}
            width={25}
            height={25}
            className={`opacity-50 group-hover:opacity-100  ${
              category === item.name && "opacity-100"
            }`}
          />
          <p className="text-xs text-center text-nowrap font-medium">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
