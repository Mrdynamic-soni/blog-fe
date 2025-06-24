import Link from "next/link";
import { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  dashboard?: boolean; // Optional prop to indicate if it's from the dashboard
}

export default function BlogCard({ post, dashboard }: BlogCardProps) {
  const isLong = post.content.length > 100;
  const contentToShow = isLong
    ? post.content.slice(0, 100) + "..."
    : post.content;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h3 className="text-lg sm:text-xl font-semibold text-blue-600">
        {post.title}
      </h3>
      <p className="text-gray-700 mt-2 text-sm sm:text-base">{contentToShow}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-xs sm:text-sm text-gray-600">
          By {post.author_email} on{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        {isLong && (
          <Link
            href={`/posts/${post.id}${dashboard ? "?from=/dashboard" : ""}`}
            className="text-blue-600 hover:underline text-sm ml-2 underline"
          >
            Read Full Post
          </Link>
        )}
      </div>
    </div>
  );
}
