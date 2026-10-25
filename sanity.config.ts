import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { projectId, dataset } from './lib/sanity/env'

export default defineConfig({
  name: 'mediwellness',
  title: 'MediWellness – Quản lý nội dung',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
