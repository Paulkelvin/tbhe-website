import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { schemaTypes } from "./sanity/schemaTypes"
import { structure } from "./sanity/studio-structure"
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./sanity/client"

// Embedded Studio, served by the Next.js app itself at /studio so content
// editing lives on the same domain as the site (see app/studio).
export default defineConfig({
  name: "tbhe",
  title: "TBHE Content Studio",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
