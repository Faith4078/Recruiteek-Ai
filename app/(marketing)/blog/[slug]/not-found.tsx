import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

const BlogPostNotFound = () => {
  return (
    <section className="blog-section items-center text-center py-16">
      <FileQuestion className="text-primary-200" size={48} />
      <h2>Post not found</h2>
      <p className="max-w-md">
        The article you&apos;re looking for doesn&apos;t exist or may have
        been moved.
      </p>
      <Button asChild className="btn-primary">
        <Link href="/blog">Back to blog</Link>
      </Button>
    </section>
  );
};

export default BlogPostNotFound;
