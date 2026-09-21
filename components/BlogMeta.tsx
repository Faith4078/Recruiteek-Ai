import { cn } from "@/lib/utils";

interface BlogMetaProps {
  author?: string;
  formattedDate: string;
  readingTime?: number;
  className?: string;
}

const BlogMeta = ({
  author,
  formattedDate,
  readingTime,
  className,
}: BlogMetaProps) => {
  const items = [
    author,
    formattedDate,
    readingTime ? `${readingTime} min read` : undefined,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className={cn("blog-meta", className)}>
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">&bull;</span>}
          {item}
        </span>
      ))}
    </div>
  );
};

export default BlogMeta;
