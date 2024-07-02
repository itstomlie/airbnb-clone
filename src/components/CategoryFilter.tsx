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
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className=" mx-5 lg:mx-24 py-5 flex gap-x-12 overflow-scroll ">
      {categories.map((item) => (
        <Link
          href={pathName + "?" + createQueryString("filter", item.name)}
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
