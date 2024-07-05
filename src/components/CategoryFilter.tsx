"use client";

import { categories } from "@/constants/categories";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

const CategoryFilter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathName = usePathname();

  const createQueryString = useCallback(
    (name: any, value: any) => {
      const params = new URLSearchParams(searchParams.toString());

      if (params.get(name) === value) {
        params.delete(name); // Remove the filter if it matches the current value
      } else {
        params.set(name, value); // Set the filter if it doesn't match
      }

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="mx-5 md:mx-12 lg:mx-24 py-5 flex gap-x-12 overflow-scroll ">
      {categories.map((item) => (
        <Link
          //if current category is selected, clicking it again will remove the filter
          href={
            pathName.includes(item.name)
              ? `${pathName}?${createQueryString("filter", "")}` // Remove filter
              : `${pathName}?${createQueryString("filter", item.name)}` // Add filter
          }
          key={item.name}
          className={`flex flex-col justify-center items-center border-black text-secondary pb-2 gap-y-2 cursor-pointer group hover:text-black hover:border-b-2 hover:border-opacity-10 ${
            search === item.name
              ? "border-b-2  text-black hover:border-opacity-100"
              : "hover:opacity-100"
          }`}
        >
          <Image
            alt={item.title}
            src={item.imageUrl}
            width={25}
            height={25}
            className={`group-hover:opacity-100 ${
              search === item.name ? "opacity-100 text-black" : "opacity-50 "
            }`}
          />
          <p
            className={`text-xs text-center text-nowrap font-medium group group-hover:opacity-100 text-black ${
              search === item.name
                ? "text-black hover:border-opacity-100"
                : "opacity-50"
            }`}
          >
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
