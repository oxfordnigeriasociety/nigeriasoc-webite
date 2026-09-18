import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
    }),
    defineField({
      name: 'photosLink',
      title: 'Google Photos Link',
      type: 'url',
      description: 'Paste the link to the Google Photos album here.',
    }),
  ],
})
