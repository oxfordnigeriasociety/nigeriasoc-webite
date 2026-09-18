'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const links = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
  { href: '/membership', label: 'Membership' },
  { href: '/gallery', label: 'Gallery' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Oxford Nigeria Society
        </Link>
        <nav className={styles.nav}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:contact@oxfordnigeriasoc.org"
          className={styles.cta}
        >
          Contact us
        </a>
      </div>
    </header>
  )
}
