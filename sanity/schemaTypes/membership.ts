import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Registration Instructions',
      type: 'text',
      description: 'Type the instructions on how to register here.',
    }),
    defineField({
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
      description: 'Paste the full URL to the membership application form.',
    }),
  ],
})
