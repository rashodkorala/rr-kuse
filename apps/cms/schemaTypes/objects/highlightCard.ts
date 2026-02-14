import { defineField, defineType } from "sanity";

export default defineType({
  name: "highlightCard",
  title: "Highlight Card",
  type: "object",
  fields: [
    defineField({
      name: "emoji",
      title: "Emoji",
      type: "string",
      description: "Short visual cue like 🎵 or 🍸.",
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(10).max(240),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      emoji: "emoji",
    },
    prepare({ title, subtitle, emoji }) {
      return {
        title: emoji ? `${emoji} ${title}` : title,
        subtitle,
      };
    },
  },
});
