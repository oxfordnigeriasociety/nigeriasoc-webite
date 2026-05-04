import { defineField, defineType } from 'sanity'

export const govDocumentSchema = defineType({
  name: 'govDocument',
  title: 'Governing Document',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'type',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Constitution', value: 'constitution' },
          { title: 'Code of Conduct', value: 'codeOfConduct' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({ name: 'fileUrl', title: 'Google Drive Link', type: 'url', validation: r => r.required() }),
  ],
})
