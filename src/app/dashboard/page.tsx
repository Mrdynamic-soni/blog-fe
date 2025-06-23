import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { JWTPayload, Post } from "@/types";

export default async function DashboardPage() {
  // 1. Get token from HTTP-only cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token from cookies:", token);

  // 2. If no token, redirect to login
  if (!token) {
    redirect("/login");
  }

  // 3. Decode and verify JWT
  let user: JWTPayload;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    console.log("Decoded user:", user);
  } catch (err) {
    console.error("Invalid or expired token:", err);
    redirect("/login");
  }

  // 4. Fetch user's posts
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/posts/posts?author=${user.userId}`,
    {
      cache: "no-store", // Ensure fresh data
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch posts:", res.status, res.statusText);
    redirect("/login");
  }

  const posts: Post[] = await res.json();

  // 5. Render dashboard UI
  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <p className="text-center mb-6 text-gray-600">
        Logged in as {user.email}
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">You haven’t written any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-md p-4"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted on {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
