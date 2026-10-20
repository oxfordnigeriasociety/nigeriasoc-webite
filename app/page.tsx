import Link from 'next/link'
import { getUpcomingEvents, getNewsletters, getDocuments, getSiteSettings } from '@/lib/sanity'
import styles from './page.module.css'
import eventStyles from './events/events.module.css' // This brings in the exact styling from your Events page!

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
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* We will swap this out for the GIF in the very next step! */}
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ borderRadius: '50%', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                <rect x="0" y="0" width="40" height="120" fill="#0A5C36" />
                <rect x="40" y="0" width="40" height="120" fill="#FFFFFF" />
                <rect x="80" y="0" width="40" height="120" fill="#0A5C36" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      {events?.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <p className={styles.eyebrow}>UPCOMING EVENTS</p>
                <h2 className={styles.sectionTitle}>What's on</h2>
              </div>
              <Link href="/events" style={{ color: '#0A5C36', fontWeight: 'bold', textDecoration: 'none' }}>
                View all →
              </Link>
            </div>
            
            {/* Notice this now uses eventStyles so it matches perfectly */}
            <div className={eventStyles.grid}>
              {events.map((event: any) => {
                const d = formatDate(event.date)
                return (
                  <div key={event._id} className={eventStyles.card} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
                    
                    <div style={{ display: 'flex', flexGrow: 1, gap: '1.5rem' }}>
                      <div className={eventStyles.cardDate} style={{ flexShrink: 0 }}>
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
                          <p className={eventStyles.cardDesc} style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', marginBottom: '1rem' }}>
                            {event.description}
                          </p>
                        )}
                        
                        {event.rsvpLink && (
                          <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className={eventStyles.rsvpBtn}>
                            RSVP for this event →
                          </a>
                        )}
                      </div>
                    </div>

                    {event.imageUrl && (
                      <div style={{ flexShrink: 0 }}>
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          style={{ 
                            width: '110px', 
                            height: '110px', 
                            borderRadius: '50%', 
                            objectFit: 'cover', 
                            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                            border: '3px solid white'
                          }} 
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Governing Documents (Restored to original layout) */}
      {docs?.length > 0 && (
        <section className={styles.sectionDark}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>GOVERNANCE</p>
              <h2 className={styles.sectionTitle}>Governing documents</h2>
            </div>
            <div className={styles.grid}>
              {docs.map((doc: any) => (
                <a key={doc._id} href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.docCard}>
                  <span className={styles.docIcon}>📄</span>
                  <div>
                    <h3 className={styles.docTitle}>{doc.title}</h3>
                    <span className={styles.docLink}>View on Google Drive →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section (Restored to original layout) */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>GET IN TOUCH</p>
            <h2 className={styles.sectionTitle}>Find us</h2>
          </div>
          <div className={styles.grid}>
            <a href="mailto:contact@oxfordnigeriasoc.org" className={styles.contactCard}>
              <span className={styles.contactIcon}>✉</span>
              <div>
                <h3 className={styles.contactTitle}>EMAIL</h3>
                <p className={styles.contactValue}>contact@oxfordnigeriasoc.org</p>
              </div>
            </a>
            {settings?.instagramLink && (
              <a href={settings.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
                <span className={styles.contactIcon}>📸</span>
                <div>
                  <h3 className={styles.contactTitle}>INSTAGRAM</h3>
                  <p className={styles.contactValue}>@oxfordnigeriasociety</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
