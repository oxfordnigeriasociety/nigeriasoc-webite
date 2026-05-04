import { defineField, defineType } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date & Time', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Event Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isFree', title: 'Free entry?', type: 'boolean', initialValue: true }),
    defineField({ name: 'rsvpLink', title: 'RSVP / Ticket Link', type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
  },
})
