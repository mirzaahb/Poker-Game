"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import cards_duo from "@/assets/images/cards-duo.png";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay using setTimeout
    const delay = 800; // Adjust the delay duration in milliseconds

    const timeoutId = setTimeout(() => {
      router.push("/dashboard");
    }, delay);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="h-screen w-screen justify-center   flex align-middle items-center bg-gradient-to-r from-red-800 via-red-500 to-red-800">
      <Image
        alt="loader-cards-duo"
        src={cards_duo}
        className="w-fit h-fit animate-spin"
      />
    </div>
  );
}
