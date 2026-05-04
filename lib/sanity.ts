import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Queries ────────────────────────────────────────────────────────────────────

export async function getUpcomingEvents() {
  return client.fetch(`
    *[_type == "event" && date >= now()] | order(date asc) [0...6] {
      _id, title, date, location, description, image
    }
  `)
}

export async function getAllEvents() {
  return client.fetch(`
    *[_type == "event"] | order(date desc) {
      _id, title, date, location, description, image
    }
  `)
}

export async function getNewsletters() {
  return client.fetch(`
    *[_type == "newsletter"] | order(publishedAt desc) {
      _id, title, publishedAt, excerpt
    }
  `)
}

export async function getNewsletter(id: string) {
  return client.fetch(`
    *[_type == "newsletter" && _id == $id][0] {
      _id, title, publishedAt, body
    }
  `, { id })
}

export async function getDocuments() {
  return client.fetch(`
    *[_type == "govDocument"] | order(_createdAt asc) {
      _id, title, type, fileUrl
    }
  `)
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      email, instagram, whatsappLink, missionStatement
    }
  `)
}
