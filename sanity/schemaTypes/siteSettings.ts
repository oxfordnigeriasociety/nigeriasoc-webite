import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram Handle', type: 'string' }),
    defineField({ name: 'whatsappLink', title: 'WhatsApp Group Link', type: 'url' }),
    defineField({ name: 'missionStatement', title: 'Mission Statement', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'email' } },
})
