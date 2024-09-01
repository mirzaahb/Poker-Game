"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/signin" ||
    pathname === "/auth/signup" ||
    pathname === "/signup/verify-email-address" ||
    pathname === "/signin/factor-one";

  return (
    <ClerkProvider>
      {isAuthPage ? (
        <>
          {children}
          <Toaster />
        </>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
      <Toaster />
    </ClerkProvider>
  );
}
