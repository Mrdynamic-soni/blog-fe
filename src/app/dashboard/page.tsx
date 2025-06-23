import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { JWTPayload, Post } from "@/types";
import BlogCard from "@/component/BlogCard";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let user: JWTPayload;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (err) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/posts/posts?author=${user.userId}`,
    { cache: "no-store", credentials: "include" }
  );

  if (!res.ok) redirect("/login");

  const posts: Post[] = await res.json();

  return (
    <main className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-white font-bold">Dashboard</h1>
          <p className="text-gray-300 text-sm mt-1">
            Logged in as <strong>{user.email}</strong>
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="mt-4 sm:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">
          You haven’t written any posts yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
