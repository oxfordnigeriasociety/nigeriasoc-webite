import { client } from '@/lib/sanity'
import styles from '../events/events.module.css' 

export default async function GalleryPage() {
  const galleryData = await client.fetch(`*[_type == "gallery"][0]`)

  return (
    <div className={styles.page}>
      <div className={styles.pageHero}>
        <div className="container">
          <p className={styles.eyebrow}>MEMORIES</p>
          <h1 className={styles.pageTitle}>{galleryData?.title || 'Gallery'}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0', maxWidth: '800px', textAlign: 'center' }}>
        <p style={{ marginTop: '1rem', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.8' }}>
          Check out our latest photos and memories from our events!
        </p>

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
            View Google Photos Album 📸
          </a>
        )}
      </div>
    </div>
  )
}
