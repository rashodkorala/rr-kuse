import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: "href",
      title: "Destination URL",
      type: "string",
      description:
        "Use either an absolute URL (https://...) or an internal path (/robroy).",
      validation: (rule) =>
        rule.required().regex(/^(https?:\/\/|\/)/, {
          name: "url-or-path",
        }),
    }),
    defineField({
      name: "isPrimary",
      title: "Primary CTA",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
