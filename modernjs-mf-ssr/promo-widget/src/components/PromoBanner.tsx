import styles from './PromoBanner.module.css';

export default function PromoBanner() {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>promo-widget · :3021</span>
      <h2 className={styles.title}>Summer Sale — 30% Off</h2>
      <p className={styles.description}>
        Federated React component loaded via Module Federation at runtime.
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={() =>
          alert('[promo-widget] Client-side JavaScript works after hydration!')
        }
      >
        Test interactivity
      </button>
    </div>
  );
}
