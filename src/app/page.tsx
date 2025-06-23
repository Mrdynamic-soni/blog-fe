// app/page.tsx
import React from "react";
import { Post } from "@/types";
import BlogCard from "@/component/BlogCard";
const Home = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/posts/posts`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  const posts: Post[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 ">
      <section className="px-4 sm:px-6 py-3 md:py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center py-4 text-gray-900">
          📝 Blog Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found.</p>
        ) : (
          <div
            className="grid gap-6
            sm:grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3"
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
