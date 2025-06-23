"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        setLoggedIn(res.ok);
      } catch (err) {
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-16 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        My Blog
      </Link>
      <nav className="space-x-6 text-sm md:text-md font-medium">
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
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-500"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
