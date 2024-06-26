"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Mail, Smartphone, X } from "lucide-react";
import { Input } from "./ui/input";
import LoginForm from "@/components/LoginForm";
import { createClient } from "@/utils/supabase/client";

import SocialLogo from "social-logos";
import { useState } from "react";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  const [useEmail, setUseEmail] = useState(true);

  // async function signInWithGoogle() {
  //   const supabase = createClient();

  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     // options: {
  //     //     // redirectTo: getURL() // function to get your URL
  //     // }
  //   });
  // }

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
          <div className="bg-white m-auto rounded-lg w-[50%]">
            <div className="flex justify-between w-full border-b p-5">
              <Link href={pathname}>
                <X strokeWidth={1} />
              </Link>
              <h3 className="font-semibold">Log in or sign up</h3>
              <X strokeWidth={1} className="opacity-0 font-semibold" />
            </div>
            <div className="p-5">
              <p className="text-start text-2xl font-medium pb-5">
                Welcome to Airbnb
              </p>
              <LoginForm useEmail={useEmail} />
            </div>
            <hr className="mx-5" />
            <div className="p-5 space-y-3">
              <button
                onClick={() => {
                  console.log("google");
                  // signInWithGoogle();
                }}
                className="w-full border p-2 rounded-lg border-black flex justify-between hover:bg-slate-50"
              >
                <SocialLogo icon="google" />
                <p>Continue with Google</p>
                <SocialLogo icon="google" className="opacity-0" />
              </button>
              <button
                onClick={() => {
                  setUseEmail(!useEmail);
                }}
                className="w-full border p-2 rounded-lg border-black flex justify-between hover:bg-slate-50"
              >
                {useEmail ? <Smartphone /> : <Mail />}
                <p>Continue with {useEmail ? "Phone" : "Email"}</p>
                <Mail className=" opacity-0" />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
