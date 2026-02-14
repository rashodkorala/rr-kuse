import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "marketingPage",
  title: "Marketing Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue Theme",
      type: "string",
      initialValue: "robroy",
      options: {
        layout: "radio",
        list: [
          { title: "Rob Roy (Orange accent)", value: "robroy" },
          { title: "Konfusion (Purple accent)", value: "konfusion" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(12).max(240),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "highlights",
      title: "Highlight Cards",
      type: "array",
      of: [defineArrayMember({ type: "highlightCard" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "highlightCard" }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title Override",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description Override",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "venue",
      slug: "slug.current",
    },
    prepare({ title, subtitle, slug }) {
      return {
        title,
        subtitle: `${subtitle ?? "generic"} • /${slug ?? ""}`,
      };
    },
  },
});
