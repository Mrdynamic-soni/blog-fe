// components/CreatePostModal.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userId: number;
};

const CreatePostModal = ({ userId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/posts/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId, title, content }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
      router.push("/dashboard");
    }
  };
  const handleClose = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Create New Post
        </h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 placeholder-gray-400 text-gray-800 rounded-md p-2"
            required
          />
          <label className="block text-lg font-medium text-gray-700 mb-1 mt-4">
            Content
          </label>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 placeholder-gray-400 text-gray-800 rounded-md p-2 h-32"
            required
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
