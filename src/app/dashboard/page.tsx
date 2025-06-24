import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { JWTPayload, Post } from "@/types";
import BlogCard from "@/component/BlogCard";
import Link from "next/link";
import { Suspense } from "react";
import DashboardSkeleton from "@/component/DashboardSkeleton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Redirect immediately if no token
  if (!token) {
    redirect("/login");
  }

  let user: JWTPayload;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    // Clear invalid token
    cookieStore.set({
      name: "token",
      value: "",
      expires: new Date(0),
      path: "/",
    });
    redirect("/login");
  }

  let posts: Post[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/posts?author=${user.userId}`,
      {
        cache: "no-store",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    posts = await res.json();
  } catch (error) {
    console.error("Failed to load posts:", error);
    // Don't redirect - show empty state instead
  }

  return (
    <main className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl hidden md:block text-white font-bold">
            Dashboard
          </h1>
          <p className="text-gray-300 text-sm mt-0 md:mt-1">
            Logged in as <strong>{user.email}</strong>
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-center"
        >
          + Create Post
        </Link>
      </div>

      {/* Posts Section with Suspense */}
      <Suspense fallback={<DashboardSkeleton />}>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {posts === null
                ? "Failed to load posts. Please try again later."
                : "You haven't written any posts yet."}
            </p>
            <Link
              href="/dashboard/create"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} dashboard />
            ))}
          </div>
        )}
      </Suspense>
    </main>
  );
}
