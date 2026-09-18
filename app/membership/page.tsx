import { client } from '@/lib/sanity'
import styles from '../events/events.module.css'

export default async function MembershipPage() {
  const membershipData = await client.fetch(`*[_type == "membership"][0]`)
  const rawText = membershipData?.description || ''
  
  // This splits the Sanity text so we can put the top half in a dropdown
  const hasSplit = rawText.includes('How to Register')
  const introText = hasSplit ? rawText.split('How to Register')[0] : rawText
  const stepsText = hasSplit ? 'How to Register\n' + rawText.split('How to Register')[1] : ''

  return (
    <div className={styles.page}>
      {/* GREEN BANNER HERO SECTION */}
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>JOIN US</p>
          <h1 className={styles.pageTitle}>{membershipData?.title || 'Membership'}</h1>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
        
        {/* DROPDOWN FOR MEMBERSHIP TYPES */}
        <details style={{ marginBottom: '2rem', cursor: 'pointer', border: '1px solid #e5e5e5', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <summary style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#0A5C36' }}>
            Choose Your Membership (Click to expand)
          </summary>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '1.5rem', lineHeight: '1.8' }}>
            {introText.replace('Choose Your Membership', '').trim()}
          </div>
        </details>

        {/* THE REGISTRATION STEPS */}
        {hasSplit && (
          <div style={{ whiteSpace: 'pre-wrap', marginBottom: '3rem', lineHeight: '1.8' }}>
            {stepsText}
          </div>
        )}

        {/* GREEN BUTTON */}
        {membershipData?.applicationLink && (
          <a 
            href={membershipData.applicationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              padding: '1rem 2.5rem', 
              backgroundColor: '#0A5C36', // Society Green
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
        )}
      </div>
    </div>
  )
}
