// utils/auth.ts
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export async function checkAuthStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: "include",
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Hook: Redirect to /dashboard only when userLoggedIn event is fired
export const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      if (await checkAuthStatus()) {
        router.replace("/dashboard");
      }
    };
    window.addEventListener("userLoggedIn", handleLogin);
    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, [router]);
};
