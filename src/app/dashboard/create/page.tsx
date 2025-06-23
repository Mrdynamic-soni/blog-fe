import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types";
import CreatePostModal from "@/component/CreatePostModal";

export default async function CreatePostPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let user: JWTPayload;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch (err) {
    redirect("/login");
  }

  return <CreatePostModal userId={user.userId} />;
}
