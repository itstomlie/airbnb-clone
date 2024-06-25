"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Modal from "../LoginModal";
import { createListing } from "@/actions";

const DropdownClient = ({ user }: { user: any }) => {
  const supabase = createClient();
  const pathname = usePathname();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.reload();
    } else {
      console.error("Error signing out:", error);
    }
  }

  const createListingWithUserId = createListing.bind(null, user?.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex justify-center items-center border rounded-full p-1 px-2 gap-x-3">
          <Menu />
          <div className="rounded-full p-2 bg-black">
            <User color="white" />
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
            <DropdownMenuItem>
              <form action={createListingWithUserId}>
                <button type="submit">Airbnb your home</button>
              </form>
            </DropdownMenuItem>
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

export default DropdownClient;
