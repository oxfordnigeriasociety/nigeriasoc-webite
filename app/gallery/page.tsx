import { client } from '@/lib/sanity'
import styles from '../events/events.module.css' 

export const revalidate = 0; // Forces fresh data from Sanity

export default async function GalleryPage() {
  const galleryData = await client.fetch(`*[_type == "gallery"][0]`)

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>MEMORIES</p>
          <h1 className={styles.pageTitle}>Gallery</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', textAlign: 'center' }}>
        
        {/* ALBUM DROPDOWNS */}
        <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
          {galleryData?.albums && galleryData.albums.map((album: any, index: number) => (
            <details 
              key={index}
              style={{ marginBottom: '1rem', cursor: 'pointer', border: '1px solid #e5e5e5', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fafafa' }}
            >
              <summary style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#0A5C36' }}>
                {album.heading}
              </summary>
              <div style={{ marginTop: '1.5rem' }}>
                {album.albumLink && (
                  <a 
                    href={album.albumLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#0A5C36', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.1rem' }}
                  >
                    View Album ↗
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* BIG MAIN BUTTON */}
        {galleryData?.photosLink && (
          <a 
            href={galleryData.photosLink} 
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
              fontWeight: 'bold' 
            }}
          >
            View All Photos 📸
          </a>
        )}
      </div>
    </div>
  )
}
