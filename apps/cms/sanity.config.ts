import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./sanity.structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "ppsg7ml5";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "RR Kuse Marketing CMS",
  projectId,
  dataset,
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
