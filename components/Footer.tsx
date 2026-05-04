import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.logo}>Oxford Nigeria Society</span>
          <p className={styles.tagline}>
            Championing Nigerian culture at the University of Oxford.
          </p>
        </div>
        <div className={styles.links}>
          <Link href="/events">Events</Link>
          <Link href="/newsletter">Newsletter</Link>
          <Link href="/about">About</Link>
          <a href="mailto:contact@oxfordnigeriasoc.org">Contact</a>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} Oxford Nigeria Society</p>
      </div>
    </footer>
  )
}
