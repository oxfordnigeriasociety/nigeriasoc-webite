import { client } from '../../sanity/lib/client' 

export default async function GalleryPage() {
  const galleryData = await client.fetch(`*[_type == "gallery"][0]`)

  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>{galleryData?.title || 'Gallery'}</h1>
      <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        Check out our latest photos and memories from our events!
      </p>

      {galleryData?.photosLink && (
        <a 
          href={galleryData.photosLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ padding: '1rem 2rem', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          View Google Photos Album 📸
        </a>
      )}
    </main>
  )
}
