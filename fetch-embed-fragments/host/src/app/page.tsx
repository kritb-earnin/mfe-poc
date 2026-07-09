import { FragmentSlot } from '@/components/FragmentSlot';
import { fetchFragments } from '@/lib/fetchFragment';
import styles from './page.module.css';

const bannerUrl =
  process.env.BANNER_FRAGMENT_URL ?? 'http://localhost:3011/fragment';
const reviewsUrl =
  process.env.REVIEWS_FRAGMENT_URL ?? 'http://localhost:3012/fragment';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const renderedAt = new Date().toISOString();

  const fragments = await fetchFragments({
    banner: bannerUrl,
    reviews: reviewsUrl,
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.badge}>host · :3010</span>
        <h1 className={styles.title}>Fetch &amp; Embed SSR Fragments</h1>
        <p>
          One page, three independent apps. The host server-fetches HTML from
          each widget and embeds the fragments on the same page — no Module
          Federation, no iframes.
        </p>
        <p className={styles.meta}>
          Host rendered at <time dateTime={renderedAt}>{renderedAt}</time>
        </p>
      </header>

      <section className={styles.grid} aria-label="Embedded micro-frontends">
        <FragmentSlot label="Banner widget" result={fragments.banner} />
        <FragmentSlot label="Reviews widget" result={fragments.reviews} />
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>How it works</h2>
        <ol>
          <li>
            Host page requests <code>{bannerUrl}</code> and{' '}
            <code>{reviewsUrl}</code> in parallel during SSR.
          </li>
          <li>
            Each widget app renders a React Server Component wrapped in{' '}
            <code>#fragment-root</code>.
          </li>
          <li>
            Host extracts the fragment HTML with cheerio and injects it via{' '}
            <code>dangerouslySetInnerHTML</code>.
          </li>
          <li>
            Widgets load independently — banner (~600ms) and reviews (~1.4s)
            are fetched in parallel; the page waits for both before responding.
          </li>
        </ol>
      </section>
    </main>
  );
}
