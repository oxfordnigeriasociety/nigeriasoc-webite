import { client } from '../../sanity/lib/client' // Adjust this path if your client is somewhere else, like '@/lib/sanity'
import Link from 'next/link'

export default async function MembershipPage() {
  // Fetch the membership document from Sanity
  const membershipData = await client.fetch(`*[_type == "membership"][0]`)

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{membershipData?.title || 'Membership'}</h1>
      
      <div style={{ whiteSpace: 'pre-wrap', marginTop: '2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
        {membershipData?.description}
      </div>

      {membershipData?.applicationLink && (
        <a 
          href={membershipData.applicationLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem 2rem', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Go to Members App 🌐
        </a>
      )}
    </main>
  )
}
