import type { Metadata } from "next";
import { Newspaper } from "lucide-react";

import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Blog | Recruiteek-Ai",
  description:
    "Interview tips, career advice, and product updates from the Recruiteek-Ai team.",
};

export const revalidate = 60;

const BlogPage = async () => {
  const posts = await getAllPosts();

  return (
    <section className="blog-section">
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <h2>The Recruiteek-Ai Blog</h2>
        <p className="text-lg max-w-2xl">
          Practical interview advice, career tips, and product updates to
          help you walk into your next interview ready to win.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="card-border w-full">
          <div className="card flex-center flex-col gap-3 py-16 text-center">
            <Newspaper className="text-primary-200" size={40} />
            <h3>No posts yet</h3>
            <p className="max-w-md">
              New articles are on the way. Check back soon for interview
              tips, career advice, and product updates.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
