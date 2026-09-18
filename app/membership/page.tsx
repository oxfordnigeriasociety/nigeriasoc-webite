import { client } from '@/lib/sanity'
import styles from '../events/events.module.css'
import { PortableText } from '@portabletext/react'

export const revalidate = 0;

export default async function MembershipPage() {
  const membershipData = await client.fetch(`*[_type == "membership"][0]`)

  const myPortableTextComponents = {
    block: {
      normal: ({children}: any) => <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1rem' }}>{children}</p>,
      small: ({children}: any) => <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.85rem' }}>{children}</p>,
      large: ({children}: any) => <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.25rem' }}>{children}</p>,
      times: ({children}: any) => <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.1rem', fontFamily: '"Times New Roman", Times, serif' }}>{children}</p>,
    },
  }

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
          <div style={{ marginBottom: '3rem' }}>
            <PortableText 
              value={membershipData.description} 
              components={myPortableTextComponents} 
            />
          </div>
        )}

        {/* MODERN DROPDOWN BANNERS */}
        {membershipData?.dropdowns && membershipData.dropdowns.map((dropdown: any, index: number) => (
          <details key={index} className={styles.modernDropdown}>
            {/* Notice the fontSize now dynamically reads from Sanity! */}
            <summary style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: dropdown.headingSize || '1.3rem', fontWeight: 'bold', color: '#0A5C36' }}>
              {dropdown.heading}
            </summary>
            <div style={{ marginTop: '1.5rem' }}>
              {dropdown.content && (
                <PortableText 
                  value={dropdown.content} 
                  components={myPortableTextComponents} 
                />
              )}
            </div>
          </details>
        ))}

        {/* WHITE CARD BUTTON (Like the Home Page) */}
        {membershipData?.applicationLink && (
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a 
              href={membershipData.applicationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem 2rem',
                backgroundColor: 'white', 
                textDecoration: 'none', 
                borderRadius: '8px', 
                border: '1px solid #e5e5e5',
                minWidth: '250px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
            >
              <span style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📝</span>
              <span style={{ color: '#888', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Registration
              </span>
              <span style={{ color: '#0A5C36', fontFamily: '"Times New Roman", Times, serif', fontSize: '1.1rem', fontWeight: 'bold' }}>
                Members App
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
