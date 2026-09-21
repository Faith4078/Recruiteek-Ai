import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary shown on the blog card and in search results.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used as both the card thumbnail on the blog listing page and the hero image on the post page.",
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Interview Tips",
          "Career Advice",
          "AI & Hiring",
          "Product Updates",
          "Candidate Stories",
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "image", title: "Photo", type: "image" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "category",
    },
  },
});
