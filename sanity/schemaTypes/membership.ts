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
  ],
})
