// utils/auth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    // If recently logged out, skip redirection
    if (localStorage.getItem("justLoggedOut") === "true") {
      localStorage.removeItem("justLoggedOut"); // reset flag
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL_URL}/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
        // Not authenticated; do nothing
      }
    };

    checkAuth();
  }, [router]);
};
