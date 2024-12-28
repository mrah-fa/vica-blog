
import { Post } from "@prisma/client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "./loading";
import { getPosts } from "@/app/postsApiCall/postsApiCall";
import DeleteButton from "@/app/components/deleteButton";


async function PostsPage() {


  const posts: Post[] = await getPosts();
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 h-full max-h-[100vh]">
        <h1 className="text-3xl font-bold mb-4 text-green-800">Blogs</h1>
        <Suspense fallback={<LoadingPage />}>
          <div className="post grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => {
              return (
                <Link
                  key={post.id}
                  href={`/pages/posts/${post.id}`}
                  className="bg-slate-400 p-4 rounded-md shadow-md flex flex-col gap-4"
                >
                  <h2 className="text-xl font-bold text-white">{post.title}</h2>
                  <p className="text-white"> {post.description}</p>
                  <button className="bg-green-800 border mt-2 text-white font-bold py-2 px-4 rounded-md  hover:bg-green-950 disabled:bg-gray-500">
                    <Link href={`/pages/posts/edit/${post.id}`}>Edit Post</Link>
                  </button>
                  {/* <button className="bg-red-800 border mt-2 text-white font-bold py-2 px-4 rounded-md  hover:bg-red-950 disabled:bg-gray-500">
                    Delete Post
                  </button> */}
                  <DeleteButton post={post} />
                </Link>
              );
            })}
          </div>
        </Suspense>
      </div>
      ;
    </>
  );
}

export default PostsPage;
