"use client";

import { Dot, SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";

const Navbar = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  const MobileView = () => (
    <div className="md:hidden py-2">
      <div className="p-3 mx-auto w-[80%] bg-white rounded-full shadow-lg flex space-x-5 items-center">
        <SearchIcon color="black" strokeWidth={2.5} />
        <div className="flex justify-between w-full items-center">
          <div>
            <p className="font-medium">Where to?</p>
            <div className="flex justify-between items-center text-gray-600 text-xs">
              <span>Anywhere</span>
              <Dot size={10} />
              <span>Any week</span>
              <Dot size={10} />
              <span>Add guests</span>
            </div>
          </div>
          <div>
            <Image
              alt="airbnb-logo"
              src={"/airbnb-mobile.svg"}
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className="hidden container md:flex justify-between items-center py-2 px-5 md:px-10 md:py-3">
      <Link href={"/"}>
        <Image
          alt="airbnb-logo"
          src={"/airbnb-mobile.svg"}
          width={30}
          height={30}
        />
      </Link>
      <div className="flex justify-evenly items-center border shadow-md rounded-full p-1 gap-x-5">
        <div className="flex gap-x-5 pl-5 text-sm">
          <p className="truncate">Anywhere</p>
          <span className="opacity-10">|</span>
          <p className="truncate">Any week</p>
          <span className="opacity-10">|</span>
          <p className="truncate">Add guests</p>
        </div>

        <div className="bg-primary rounded-full p-2 w-10">
          <SearchIcon color="white" />
        </div>
      </div>
      <Dropdown user={user} />
    </div>
  );

  return (
    <section className="sticky top-0 z-50 bg-white shadow-md">
      {isRoot && <MobileView />}
      <DesktopView />
    </section>
  );
};

export default Navbar;
