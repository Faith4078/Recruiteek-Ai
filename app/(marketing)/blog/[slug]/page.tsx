import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import PortableTextRenderer from "@/components/PortableTextRenderer";
import { urlForImage } from "@/lib/sanity/image";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post not found | Recruiteek-Ai" };

  return {
    title: `${post.title} | Recruiteek-Ai Blog`,
    description: post.excerpt,
  };
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const coverUrl = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(675).url()
    : null;

  const formattedDate = dayjs(post.publishedAt).format("MMM D, YYYY");

  return (
    <article className="blog-section">
      <Link
        href="/blog"
        className="flex items-center gap-2 text-sm font-semibold text-light-100 hover:text-primary-200 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back to blog
      </Link>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center">
        {post.category && (
          <p className="blog-category mx-auto">{post.category}</p>
        )}
        <h2>{post.title}</h2>
        <div className="blog-meta justify-center">
          {post.author?.name && <span>{post.author.name}</span>}
          <span>{formattedDate}</span>
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
      </div>

      {coverUrl && (
        <div className="relative w-full max-w-4xl mx-auto h-[280px] sm:h-[420px] rounded-2xl overflow-hidden">
          <Image
            src={coverUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover"
            priority
            fetchPriority="high"
          />
        </div>
      )}

      <PortableTextRenderer value={post.body} />
    </article>
  );
};

export default BlogPostPage;
