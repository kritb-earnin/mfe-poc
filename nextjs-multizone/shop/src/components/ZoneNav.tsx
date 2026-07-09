import styles from './ZoneNav.module.css';

export function ZoneNav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <a href="/" className={styles.brand}>
        MFE Store
      </a>
      <div className={styles.links}>
        <a href="/">Home zone</a>
        <a href="/shop">Shop zone</a>
        <a href="/shop/products/1">Sample product</a>
      </div>
    </nav>
  );
}
