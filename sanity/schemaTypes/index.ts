import { eventSchema } from './event'
import { newsletterSchema } from './newsletter'
import { govDocumentSchema } from './govDocument'
import { siteSettingsSchema } from './siteSettings'
import membership from './membership'
// ... other imports

export const schemaTypes = [
  // ... existing types
  membership,
]
export const schemaTypes = [
  eventSchema,
  newsletterSchema,
  govDocumentSchema,
  siteSettingsSchema,
]
