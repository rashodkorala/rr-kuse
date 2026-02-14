import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title",
      type: "string",
      validation: (rule) => rule.required().min(10).max(70),
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "defaultAccent",
      title: "Default Accent Palette",
      type: "string",
      initialValue: "robroy",
      options: {
        layout: "radio",
        list: [
          { title: "Rob Roy (Orange)", value: "robroy" },
          { title: "Konfusion (Purple)", value: "konfusion" },
        ],
      },
    }),
    defineField({
      name: "announcementEnabled",
      title: "Enable Top Announcement",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "announcementText",
      title: "Announcement Text",
      type: "string",
      hidden: ({ document }) => !document?.announcementEnabled,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.announcementEnabled) return true;
          return value && value.length >= 5
            ? true
            : "Announcement text is required when announcement is enabled.";
        }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "defaultSeoTitle",
    },
  },
});
