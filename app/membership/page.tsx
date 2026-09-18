import { client } from '@/lib/sanity'
import styles from '../events/events.module.css'
import { PortableText } from '@portabletext/react'

export const revalidate = 0;

export default async function MembershipPage() {
  const membershipData = await client.fetch(`*[_type == "membership"][0]`)

  // This rule forces grey text, fixes your spacing, and handles your new text options!
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
            <summary style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#0A5C36' }}>
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
