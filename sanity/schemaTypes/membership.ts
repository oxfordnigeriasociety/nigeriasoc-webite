import {defineField, defineType} from 'sanity'

const customTextOptions = {
  type: 'block',
  styles: [
    {title: 'Normal Text', value: 'normal'},
    {title: 'Small Text', value: 'small'},
    {title: 'Large Text', value: 'large'},
    {title: 'Times New Roman', value: 'times'},
  ]
}

export default defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Introduction Text',
      type: 'array',
      of: [customTextOptions],
    }),
    defineField({
      name: 'dropdowns',
      title: 'Expandable Banners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Banner Heading', type: 'string' },
            { 
              name: 'headingSize', 
              title: 'Heading Size', 
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: '1.1rem' },
                  { title: 'Medium', value: '1.3rem' },
                  { title: 'Large', value: '1.5rem' }
                ],
                layout: 'radio'
              },
              initialValue: '1.3rem'
            },
            { name: 'content', title: 'Banner Content', type: 'array', of: [customTextOptions] }
          ]
        }
      ],
    }),
    defineField({ name: 'applicationLink', title: 'Application Link', type: 'url' }),
  ],
})
