import Link from 'next/link'
import { getUpcomingEvents, getNewsletters, getDocuments, getSiteSettings } from '@/lib/sanity'
import styles from './page.module.css'

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

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>University of Oxford · Est. 2024</p>
            <h1 className={styles.heroTitle}>
              Championing <em>Nigerian culture</em> at Oxford
            </h1>
            <p className={styles.heroMission}>
              {settings?.missionStatement ||
                'To champion Nigerian culture within the University of Oxford, fostering a strong network that inspires lifelong engagement and direct connections to Nigeria.'}
            </p>
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
            <span className={styles.decorFlag}>🇳🇬</span>
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
                <h2 className={styles.sectionTitle}>What's on</h2>
              </div>
              <Link href="/events" className={styles.seeAll}>View all →</Link>
            </div>
            <div className={styles.eventsGrid}>
              {events.map((event: any) => {
                const d = formatDate(event.date)
                return (
                  <div key={event._id} className={styles.eventCard}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDay}>{d.day}</span>
                      <span className={styles.eventMonth}>{d.month}</span>
                    </div>
                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <p className={styles.eventMeta}>
                        {event.location && <span>{event.location}</span>}
                        {event.location && ' · '}
                        <span>{d.time}</span>
                        {event.isFree && <span className={styles.freeBadge}>Free</span>}
                      </p>
                      {event.description && (
                        <p className={styles.eventDesc}>{event.description}</p>
                      )}
                      {event.rsvpLink && (
                        <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className={styles.rsvpLink}>
                          RSVP →
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {newsletters?.length > 0 && (
        <section className={`${styles.section} ${styles.newsletterSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionLabel}>Newsletter</p>
                <h2 className={styles.sectionTitle}>Latest issues</h2>
              </div>
              <Link href="/newsletter" className={styles.seeAll}>View all →</Link>
            </div>
            <div className={styles.newsletterGrid}>
              {newsletters.slice(0, 3).map((n: any) => (
                <Link key={n._id} href={`/newsletter/${n._id}`} className={styles.newsletterCard}>
                  <div>
                    <h3 className={styles.newsletterTitle}>{n.title}</h3>
                    <p className={styles.newsletterDate}>
                      {new Date(n.publishedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </p>
                    {n.excerpt && <p className={styles.newsletterExcerpt}>{n.excerpt}</p>}
                  </div>
                  <span className={styles.arrow}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Governing Docs */}
      {docs?.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <p className={styles.sectionLabel}>Governance</p>
            <h2 className={styles.sectionTitle}>Governing documents</h2>
            <div className={styles.docsGrid}>
              {docs.map((doc: any) => (
                <a key={doc._id} href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.docCard}>
                  <span className={styles.docIcon}>📄</span>
                  <div>
                    <h3 className={styles.docTitle}>{doc.title}</h3>
                    <p className={styles.docSub}>View on Google Drive →</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className={styles.contactSection}>
        <div className="container">
          <p className={styles.sectionLabel}>Get in touch</p>
          <h2 className={styles.sectionTitle}>Find us</h2>
          <div className={styles.contactGrid}>
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className={styles.contactCard}>
                <span className={styles.contactIcon}>✉</span>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>{settings.email}</span>
              </a>
            )}
            {settings?.instagram && (
              <a href={`https://instagram.com/${settings.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <span className={styles.contactIcon}>📸</span>
                <span className={styles.contactLabel}>Instagram</span>
                <span className={styles.contactValue}>{settings.instagram}</span>
              </a>
            )}
            {settings?.whatsappLink && (
              <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <span className={styles.contactIcon}>💬</span>
                <span className={styles.contactLabel}>WhatsApp</span>
                <span className={styles.contactValue}>Join group</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
