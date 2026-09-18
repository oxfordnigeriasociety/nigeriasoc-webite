import { client } from '@/lib/sanity'
import styles from '../events/events.module.css'
import { PortableText } from '@portabletext/react'

export const revalidate = 0; // This forces the page to always show your latest Sanity updates!

export default async function MembershipPage() {
  const membershipData = await client.fetch(`*[_type == "membership"][0]`)

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>JOIN US</p>
          <h1 className={styles.pageTitle}>Membership</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
        
        {/* RICH TEXT INTRODUCTION */}
        {membershipData?.description && (
          <div style={{ marginBottom: '3rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <PortableText value={membershipData.description} />
          </div>
        )}

        {/* DYNAMIC DROPDOWN BANNERS */}
        {membershipData?.dropdowns && membershipData.dropdowns.map((dropdown: any, index: number) => (
          <details 
            key={index}
            style={{ marginBottom: '1rem', cursor: 'pointer', border: '1px solid #e5e5e5', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fafafa' }}
          >
            <summary style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#0A5C36' }}>
              {dropdown.heading}
            </summary>
            <div style={{ marginTop: '1.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {dropdown.content && <PortableText value={dropdown.content} />}
            </div>
          </details>
        ))}

        {/* GREEN BUTTON */}
        {membershipData?.applicationLink && (
          <div style={{ marginTop: '3rem' }}>
            <a 
              href={membershipData.applicationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block',
                padding: '1rem 2.5rem', 
                backgroundColor: '#0A5C36', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '5px', 
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                border: 'none'
              }}
            >
              Go to Members App 🌐
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
