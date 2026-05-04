import { getDocuments, getSiteSettings } from '@/lib/sanity'
import styles from './about.module.css'

export const revalidate = 60
export const metadata = { title: 'About | Oxford Nigeria Society' }

export default async function AboutPage() {
  const [docs, settings] = await Promise.all([getDocuments(), getSiteSettings()])

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>Who we are</p>
          <h1 className={styles.pageTitle}>About us</h1>
        </div>
      </div>

      <div className="container">
        <section className={styles.section}>
          <div className={styles.missionBlock}>
            <p className={styles.missionLabel}>Our mission</p>
            <blockquote className={styles.missionQuote}>
              {settings?.missionStatement ||
                'To champion Nigerian culture within the University of Oxford, fostering a strong network that inspires lifelong engagement and direct connections to Nigeria.'}
            </blockquote>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What we do</h2>
          <div className={styles.pillarsGrid}>
            {[
              { icon: '🎭', title: 'Culture & Events', desc: 'Celebrating Nigerian traditions, arts, food, and music through regular events open to the whole Oxford community.' },
              { icon: '🤝', title: 'Community & Network', desc: 'Connecting Nigerian students across Oxford colleges and building lasting relationships.' },
              { icon: '🌍', title: 'Partnerships', desc: 'Collaborating with other societies and organisations to build bridges between Oxford and Nigeria.' },
            ].map(p => (
              <div key={p.title} className={styles.pillarCard}>
                <span className={styles.pillarIcon}>{p.icon}</span>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {docs?.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Governing documents</h2>
            <p className={styles.sectionSub}>Our constitution and code of conduct govern how the society operates.</p>
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
          </section>
        )}

        <section className={`${styles.section} ${styles.contactSection}`}>
          <h2 className={styles.sectionTitle}>Get in touch</h2>
          <div className={styles.contactRow}>
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className={styles.contactItem}>
                <span>✉</span> {settings.email}
              </a>
            )}
            {settings?.instagram && (
              <a href={`https://instagram.com/${settings.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <span>📸</span> {settings.instagram}
              </a>
            )}
            {settings?.whatsappLink && (
              <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <span>💬</span> Join our WhatsApp
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
