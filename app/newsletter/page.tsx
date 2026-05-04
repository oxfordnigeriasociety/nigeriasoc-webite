import Link from 'next/link'
import { getNewsletters } from '@/lib/sanity'
import styles from './newsletter.module.css'

export const revalidate = 60

export const metadata = { title: 'Newsletter | Oxford Nigeria Society' }

export default async function NewsletterPage() {
  const newsletters = await getNewsletters()

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>Stay informed</p>
          <h1 className={styles.pageTitle}>Newsletter</h1>
        </div>
      </div>

      <div className="container">
        {newsletters?.length > 0 ? (
          <div className={styles.grid}>
            {newsletters.map((n: any, i: number) => (
              <Link key={n._id} href={`/newsletter/${n._id}`} className={styles.card}>
                <div className={styles.issueNumber}>#{newsletters.length - i}</div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{n.title}</h2>
                  <p className={styles.cardDate}>
                    {new Date(n.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                  {n.excerpt && <p className={styles.cardExcerpt}>{n.excerpt}</p>}
                </div>
                <span className={styles.arrow}>→</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No newsletters yet — check back soon.</p>
        )}
      </div>
    </div>
  )
}
