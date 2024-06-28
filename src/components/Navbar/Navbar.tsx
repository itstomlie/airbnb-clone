import { SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import DropdownServer from "./DropdownServer";
import { redirect } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  return (
    <section className="container py-3 px-5 lg:px-10 flex justify-between border-b">
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
      <DropdownServer />
    </section>
  );
};

export default Navbar;
