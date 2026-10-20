import Link from 'next/link'
import { getUpcomingEvents, getNewsletters, getDocuments, getSiteSettings } from '@/lib/sanity'
import { RipplingFlag } from '@/components/RipplingFlag'
import styles from './page.module.css'
import eventStyles from './events/events.module.css'
// Reuse the About page's styles so Governing documents + contact look identical there and here
import aboutStyles from './about/about.module.css'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  }
}

export const revalidate = 60

export default async function HomePage() {
  const [events, newsletters, docs, settings] = await Promise.all([
    getUpcomingEvents(),
    getNewsletters(),
    getDocuments(),
    getSiteSettings(),
  ])

  const email = settings?.email || 'contact@oxfordnigeriasoc.org'
  const instagram = settings?.instagram as string | undefined

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>University of Oxford · Est. 2026</p>
            <h1 className={styles.heroTitle}>
              Championing <em>Nigerian culture</em> at the University of Oxford
            </h1>

            <div className={styles.heroActions}>
              {settings?.whatsappLink && (
                <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                  Join our WhatsApp
                </a>
              )}
              <Link href="/events" className={styles.btnSecondary}>
                Upcoming events →
              </Link>
            </div>
          </div>

          <div className={styles.heroDecor} aria-hidden="true">
            <div className={styles.decorCircle1} />
            <div className={styles.decorCircle2} />
            <div className={styles.flagHolder}>
              <RipplingFlag />
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      {events?.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionLabel}>Upcoming events</p>
                <h2 className={styles.sectionTitle}>What&apos;s on</h2>
              </div>
              <Link href="/events" className={styles.seeAll}>
                View all →
              </Link>
            </div>

            <div className={eventStyles.grid}>
              {events.map((event: any) => {
                const d = formatDate(event.date)
                return (
                  <div key={event._id} className={`${eventStyles.card} ${styles.homeEventCard}`}>
                    <div className={eventStyles.cardDate}>
                      <span className={eventStyles.day}>{d.day}</span>
                      <span className={eventStyles.month}>{d.month}</span>
                    </div>

                    <div className={eventStyles.cardBody}>
                      <h3 className={eventStyles.cardTitle}>{event.title}</h3>
                      <p className={eventStyles.cardMeta}>
                        {d.full} · {d.time}
                        {event.location && ` · ${event.location}`}
                        {event.isFree && <span className={eventStyles.badge}>Free</span>}
                      </p>

                      {event.description && (
                        <p className={`${eventStyles.cardDesc} ${styles.preWrap}`}>{event.description}</p>
                      )}

                      {event.rsvpLink && (
                        <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className={eventStyles.rsvpBtn}>
                          RSVP for this event →
                        </a>
                      )}
                    </div>

                    {event.imageUrl && (
                      <img src={event.imageUrl} alt={event.title} className={styles.eventThumb} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Governing documents — identical to the About page */}
      {docs?.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <h2 className={aboutStyles.sectionTitle}>Governing documents</h2>
            <p className={aboutStyles.sectionSub}>Our constitution and code of conduct govern how the society operates.</p>
            <div className={aboutStyles.docsGrid}>
              {docs.map((doc: any) => (
                <a key={doc._id} href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className={aboutStyles.docCard}>
                  <span className={aboutStyles.docIcon}>📄</span>
                  <div>
                    <h3 className={aboutStyles.docTitle}>{doc.title}</h3>
                    <p className={aboutStyles.docSub}>View on Google Drive →</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Find us — same style as "Get in touch" on the About page */}
      <section className={styles.sectionLast}>
        <div className="container">
          <div className={aboutStyles.contactSection}>
            <h2 className={aboutStyles.sectionTitle}>Find us</h2>
            <div className={aboutStyles.contactRow}>
              <a href={`mailto:${email}`} className={aboutStyles.contactItem}>
                <span>✉</span> {email}
              </a>
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={aboutStyles.contactItem}
                >
                  <span>📸</span> {instagram}
                </a>
              )}
              {settings?.whatsappLink && (
                <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer" className={aboutStyles.contactItem}>
                  <span>💬</span> Join our WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
