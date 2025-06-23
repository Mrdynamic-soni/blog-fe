"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/auth/me`,
        {
          credentials: "include",
        }
      );
      setLoggedIn(res.ok);
    } catch (err) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // 👂 Listen for login event
    const handleLogin = () => checkAuth();
    window.addEventListener("userLoggedIn", handleLogin);

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-16 lg:px-32 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-3xl font-bold text-gray-800">
        My Blog
      </Link>
      <nav className="space-x-6 text-lg md:text-md font-medium">
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
