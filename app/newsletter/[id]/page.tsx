import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { getNewsletter } from '@/lib/sanity'
import styles from './issue.module.css'

export const revalidate = 60

export default async function NewsletterIssuePage({ params }: { params: { id: string } }) {
  const newsletter = await getNewsletter(params.id)

  if (!newsletter) {
    return (
      <div className="container" style={{ padding: '80px 24px' }}>
        <p>Newsletter not found.</p>
        <Link href="/newsletter">← Back to newsletters</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link href="/newsletter" className={styles.back}>← All newsletters</Link>
        <article className={styles.article}>
          <header className={styles.header}>
            <p className={styles.date}>
              {new Date(newsletter.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
            <h1 className={styles.title}>{newsletter.title}</h1>
          </header>
          <div className={styles.body}>
            {newsletter.body && <PortableText value={newsletter.body} />}
          </div>
        </article>
      </div>
    </div>
  )
}
