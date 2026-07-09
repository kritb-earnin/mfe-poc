import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <span className={styles.badge}>Home zone · port 3000</span>
      <h1 className={styles.title}>Next.js Multi-Zones</h1>
      <p>
        This page is served by the <strong>home</strong> Next.js app. The shop
        section lives in a separate zone — its own codebase, dev server, and
        deployment — but appears on the same domain via rewrites.
      </p>

      <section className={styles.card}>
        <h2>How routing works</h2>
        <ul>
          <li>
            <code>/</code> and <code>/about</code> → home zone (this app)
          </li>
          <li>
            <code>/shop</code> and <code>/shop/*</code> → shop zone (port 3001)
          </li>
        </ul>
        <p>
          Cross-zone links use plain <code>&lt;a&gt;</code> tags so the browser
          performs a full navigation. Next.js <code>Link</code> is only used
          within a single zone.
        </p>
      </section>

      <div className={styles.actions}>
        <a href="/shop" className={styles.primary}>
          Visit shop zone →
        </a>
        <Link href="/about" className={styles.secondary}>
          About (same zone)
        </Link>
      </div>
    </div>
  );
}
