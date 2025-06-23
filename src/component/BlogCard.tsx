// components/BlogCard.tsx
"use client";

import { useState } from "react";
import { Post } from "@/types";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const isLong = post.content.length > 100;
  const contentToShow = expanded ? post.content : post.content.slice(0, 100);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
        {post.title}
      </h3>
      <p className="text-gray-700 mt-2 text-sm sm:text-base">
        {contentToShow}
        {isLong && (
          <>
            {!expanded && "... "}
            <button
              onClick={toggleExpanded}
              className="text-blue-600 hover:underline text-sm ml-1 underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </>
        )}
      </p>
      <p className="text-xs sm:text-sm text-gray-600 mt-4">
        By {post.author_email} on{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
