import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { studioTheme } from './sanity/theme'
import { StudioLogo } from './sanity/SanityLogo'

export default defineConfig({
  name: 'oxford-nigeria-society',
  title: 'Oxford Nigeria Society',
  basePath: '/studio', 
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('newsletter').title('Newsletter'),
            S.documentTypeListItem('govDocument').title('Governing Documents'),
            S.documentTypeList('membership').title('Membership'),
            S.divider(),
            S.documentTypeListItem('siteSettings').title('Site Settings'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  // theme: studioTheme,
  // studio: {
  //   components: {
  //     logo: StudioLogo,
  //   },
  // },
})
