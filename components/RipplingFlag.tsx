import type { CSSProperties } from 'react'
import styles from './RipplingFlag.module.css'

// The flag is cut into thin vertical strips. Each strip bobs up and down a
// little later than the one before it, so a wave travels from the pole to the
// free end. Strips further from the pole move more, like real fabric.
const STRIPS = 60

export function RipplingFlag() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={styles.pole} />
      <div className={styles.flag}>
        {Array.from({ length: STRIPS }, (_, i) => (
          <span
            key={i}
            className={styles.strip}
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
