"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/auth/logoutAction";
import { checkAuthStatus } from "@/lib/auth/checkAndRedirect";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Check authentication status
  const checkAuth = async () => {
    setLoggedIn(await checkAuthStatus());
  };

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 30000);

    // Listen for login/logout events and update auth state immediately
    const handleUserChange = () => checkAuth();
    window.addEventListener("userLoggedIn", handleUserChange);
    window.addEventListener("userLoggedOut", handleUserChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("userLoggedIn", handleUserChange);
      window.removeEventListener("userLoggedOut", handleUserChange);
    };
  }, []);

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;

    try {
      localStorage.clear();
      sessionStorage.clear();
      await logoutAction();
      setLoggedIn(false);
      window.dispatchEvent(new Event("userLoggedOut"));
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
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
