// app/page.tsx

import React from "react";
import { Post } from "@/types";

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
    <main className="min-h-screen bg-gray-50 pt-20">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-4 sm:px-6 lg:px-32 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">My Blog</h1>
        <nav className="space-x-2 sm:space-x-4">
          <a
            href="/login"
            className="text-sm sm:text-md font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </a>
          <a
            href="/signup"
            className="text-sm sm:text-md font-medium text-gray-700 hover:text-blue-600"
          >
            Sign Up
          </a>
        </nav>
      </header>

      <section className="px-4 sm:px-6 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
          📝 Blog Posts
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts found.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
                  {post.title}
                </h3>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">
                  {post.content}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-4">
                  By {post.author_email} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
