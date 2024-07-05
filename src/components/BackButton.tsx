// components/BackButton.js
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="rounded-full bg-white p-1 cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft size={15} />
    </button>
  );
};

export default BackButton;
