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
      title: 'Introduction Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Use this for your main text. Highlight text to make it bold, italic, or add links.',
    }),
    defineField({
      name: 'dropdowns',
      title: 'Expandable Banners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Banner Heading (e.g. How to Register)', type: 'string' },
            { name: 'content', title: 'Banner Content', type: 'array', of: [{type: 'block'}] }
          ]
        }
      ],
      description: 'Add as many clickable dropdown banners as you want here.',
    }),
    defineField({
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
    }),
  ],
})
