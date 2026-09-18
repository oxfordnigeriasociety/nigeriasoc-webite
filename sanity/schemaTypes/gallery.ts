import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title (Not shown on website)',
      type: 'string',
    }),
    defineField({
      name: 'albums',
      title: 'Photo Albums (Dropdowns)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Album Name (e.g. Welcome Dinner 2026)', type: 'string' },
            { name: 'albumLink', title: 'Google Photos Link', type: 'url' }
          ]
        }
      ],
      description: 'Add clickable dropdowns for your event albums here.',
    }),
    defineField({
      name: 'photosLink',
      title: 'Main Google Photos Link (Optional big button at the bottom)',
      type: 'url',
    }),
  ],
})
