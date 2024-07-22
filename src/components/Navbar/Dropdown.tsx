"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, UserIcon } from "lucide-react";
import Link from "next/link";
import { createListing } from "@/actions";
import { createClient } from "@/utils/supabase/client";

const Dropdown = ({ pathname, user }: { pathname: string; user: any }) => {
  const supabase = createClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.reload();
    } else {
      console.error("Error signing out:", error);
    }
  }

  const createListingWithUserId = createListing.bind(null, user?.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex justify-center items-center border rounded-full p-1 px-2 gap-x-3">
          <Menu />
          <div
            className={`rounded-full p-2 ${user ? "bg-primary" : "bg-black"}`}
          >
            <UserIcon color="white" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10">
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={createListingWithUserId}>
                <button type="submit">Airbnb your home</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Wishlists</DropdownMenuItem>
            <DropdownMenuItem>Listings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
          </>
        ) : (
          <>
            <Link href={`${pathname}/?modal=true`}>
              <DropdownMenuItem className="font-medium">
                Airbnb your home
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            <Link href={`${pathname}/?modal=true`}>
              <DropdownMenuItem className="font-medium">
                Log In
              </DropdownMenuItem>
            </Link>
            <Link href={`${pathname}/?modal=true`}>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
