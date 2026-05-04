import { getAllEvents } from '@/lib/sanity'
import styles from './events.module.css'

export const revalidate = 60

export const metadata = {
  title: 'Events | Oxford Nigeria Society',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default async function EventsPage() {
  const events = await getAllEvents()
  const now = new Date()
  const upcoming = events?.filter((e: any) => new Date(e.date) >= now) || []
  const past = events?.filter((e: any) => new Date(e.date) < now) || []

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>What's on</p>
          <h1 className={styles.pageTitle}>Events</h1>
        </div>
      </div>

      <div className="container">
        {upcoming.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Upcoming</h2>
            <div className={styles.grid}>
              {upcoming.map((event: any) => {
                const d = formatDate(event.date)
                return (
                  <div key={event._id} className={styles.card}>
                    <div className={styles.cardDate}>
                      <span className={styles.day}>{d.day}</span>
                      <span className={styles.month}>{d.month}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{event.title}</h3>
                      <p className={styles.cardMeta}>
                        {d.full} · {d.time}
                        {event.location && ` · ${event.location}`}
                        {event.isFree && <span className={styles.badge}>Free</span>}
                      </p>
                      {event.description && <p className={styles.cardDesc}>{event.description}</p>}
                      {event.rsvpLink && (
                        <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer" className={styles.rsvpBtn}>
                          RSVP for this event →
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {upcoming.length === 0 && (
          <section className={styles.section}>
            <p className={styles.empty}>No upcoming events right now — check back soon.</p>
          </section>
        )}

        {past.length > 0 && (
          <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} ${styles.pastTitle}`}>Past events</h2>
            <div className={styles.grid}>
              {past.map((event: any) => {
                const d = formatDate(event.date)
                return (
                  <div key={event._id} className={`${styles.card} ${styles.pastCard}`}>
                    <div className={`${styles.cardDate} ${styles.pastDate}`}>
                      <span className={styles.day}>{d.day}</span>
                      <span className={styles.month}>{d.month}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{event.title}</h3>
                      <p className={styles.cardMeta}>{d.full} · {event.location}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
