import React from "react";
import { createClient } from "@/utils/supabase/server";
import DropdownClient from "./Dropdown";
import { redirect } from "next/navigation";

const DropdownServer = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return;
};

export default DropdownServer;
