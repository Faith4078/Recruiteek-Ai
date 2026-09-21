import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { Newspaper } from "lucide-react";

import { urlForImage } from "@/lib/sanity/image";
import BlogMeta from "@/components/BlogMeta";

const BlogCard = ({ post }: { post: BlogPost }) => {
  const coverUrl = post.mainImage
    ? urlForImage(post.mainImage).width(480).height(320).url()
    : null;

  const formattedDate = dayjs(post.publishedAt).format("MMM D, YYYY");

  return (
    <Link href={`/blog/${post.slug}`} className="card-blog group">
      <div className="blog-cover">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex-center h-full blue-gradient-dark">
            <Newspaper className="text-primary-200" size={36} />
          </div>
        )}
      </div>

      <div className="blog-body">
        {post.category && (
          <p className="blog-category">{post.category}</p>
        )}

        <h3 className="line-clamp-2">{post.title}</h3>

        <p className="line-clamp-3">{post.excerpt}</p>

        <BlogMeta
          author={post.author?.name}
          formattedDate={formattedDate}
          readingTime={post.readingTime}
          className="mt-auto"
        />
      </div>
    </Link>
  );
};

export default BlogCard;
