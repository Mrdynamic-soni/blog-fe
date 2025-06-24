"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/auth/logoutAction";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/auth/me`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );
      setLoggedIn(res.ok);
    } catch (err) {
      console.error("Failed to check auth:", err);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 30000); // Check auth every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;

    try {
      // Clear client storage first
      localStorage.clear();
      sessionStorage.clear();

      // Execute server action
      await logoutAction();

      // Update state and redirect
      setLoggedIn(false);
      router.push("/");
      router.refresh(); // Force refresh to ensure clean state
    } catch (err) {
      console.error("Logout failed:", err);
      // Fallback: force full page reload
      window.location.href = "/";
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-16 lg:px-80 flex justify-between items-center fixed top-0 left-0 right-0 z-50 ">
      <Link href="/" className="text-xl md:text-3xl font-bold text-gray-800">
        My Blog
      </Link>
      <nav className="space-x-6 text-sm md:text-lg md:text-md font-medium">
        {!loggedIn ? (
          <>
            <Link
              href="/login"
              className={clsx(
                pathname === "/login"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              )}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={clsx(
                pathname === "/signup"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              )}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className={clsx(
                pathname === "/dashboard"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              )}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
