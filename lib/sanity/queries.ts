import { sanityClient, isSanityConfigured } from "./client";

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  category,
  publishedAt,
  readingTime,
  author
`;

export const allPostsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`;

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return [];

  try {
    return await sanityClient.fetch<BlogPost[]>(allPostsQuery);
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  if (!isSanityConfigured) return null;

  try {
    return await sanityClient.fetch<BlogPostDetail | null>(postBySlugQuery, {
      slug,
    });
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from Sanity:`, error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];

  try {
    return await sanityClient.fetch<string[]>(postSlugsQuery);
  } catch (error) {
    console.error("Failed to fetch blog post slugs from Sanity:", error);
    return [];
  }
}
