import { notFound } from "next/navigation";
import { Post } from "@/types";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/posts?postid=${id}`,
      {
        cache: "force-cache",
        next: { tags: [`post-${id}`] },
      }
    );

    if (!res.ok) {
      console.error("API request failed:", res.statusText);
      return null;
    }

    const data = await res.json();

    // Handle different response formats
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }

    if (data && typeof data === "object") {
      return data as Post;
    }

    return null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export const dynamicParams = true;
export const revalidate = 60;

export default async function BlogPostPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) return notFound();

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const backHref = resolvedSearchParams?.from?.toString() || "/dashboard";

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-2 py-8">
      <article className="bg-white w-full max-w-2xl rounded-xl shadow-md p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-2">
          {post.title}
        </h1>
        <p className="text-xs text-gray-500 mb-4">
          By {post.author_email} on{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="text-gray-800 text-base whitespace-pre-line break-words">
          {post.content}
        </div>
      </article>
      <Link
        href={backHref}
        className="mt-4 self-end text-sm text-blue-600 hover:underline"
      >
        ← Go Back
      </Link>
    </main>
  );
}
