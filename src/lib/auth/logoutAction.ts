"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const authCookies = [
    "token",
    "session",
    "auth-token",
    "next-auth.session-token",
    "next-auth.csrf-token",
  ];

  // Delete all auth cookies with proper attributes
  authCookies.forEach((cookieName) => {
    cookieStore.set({
      name: cookieName,
      value: "",
      expires: new Date(0),
      path: "/",
      // Add if using cross-subdomain auth:
      // domain: '.yourdomain.com'
    });
  });

  // Invalidate server session
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Logout failed with status ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to invalidate server session:", error);
    // Continue with redirect even if API logout fails
  }

  // Clear client-side storage via redirect

  window.dispatchEvent(new Event("userLoggedOut"));
  redirect("/");
}
