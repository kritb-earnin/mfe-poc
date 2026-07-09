import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <span className={styles.badge}>Home zone · port 3000</span>
      <h1 className={styles.title}>About</h1>
      <p>
        This route is still part of the home zone. It shares the home app&apos;s
        layout, build, and deployment — completely separate from the shop zone.
      </p>
      <p>
        <a href="/">← Back to home</a>
      </p>
    </div>
  );
}
