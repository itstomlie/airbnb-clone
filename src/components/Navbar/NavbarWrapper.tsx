"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const [user, setUser] = useState<null | User>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  return <Navbar user={user} />;
};

export default NavbarWrapper;
