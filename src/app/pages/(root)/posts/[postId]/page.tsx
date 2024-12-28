import { Post } from "@prisma/client";
import Link from "next/link";
import { getSinglePost } from "@/app/postsApiCall/postsApiCall";
import DeleteButton from "@/app/components/deleteButton";

async function PostPage({ params }: { params: { postId: string } }) {
  const post: Post = await getSinglePost(params.postId);

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 h-full max-h-[100vh]">
        <h1 className="text-3xl font-bold mb-4 text-green-800">Post Details</h1>
        <div className="post bg-slate-400 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-white">{post.title}</h2>
          <p className="text-white">{post.description}</p>
          <div className="mt-4">
            <Link href={`/pages/posts/edit/${post.id}`}>
              <button className="bg-green-800 border text-white font-bold py-2 px-4 rounded-md hover:bg-green-950">
                Edit Post
              </button>
            </Link>
            <DeleteButton post={post} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
