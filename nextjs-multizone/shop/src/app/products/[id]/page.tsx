import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const catalog: Record<string, { name: string; price: number; description: string }> = {
  '1': {
    name: 'Trail Running Shoes',
    price: 129.99,
    description: 'Lightweight shoes built for mixed terrain and long distances.',
  },
  '2': {
    name: 'Insulated Water Bottle',
    price: 34.5,
    description: 'Keeps drinks cold for 24 hours. Fits standard cup holders.',
  },
  '3': {
    name: 'Daypack 24L',
    price: 89.0,
    description: 'Compact pack with laptop sleeve and rain cover included.',
  },
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = catalog[id];

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <span className={styles.badge}>Shop zone · port 3001</span>
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <div className={styles.links}>
        <Link href="/">← Shop home</Link>
        <a href="/">Home zone</a>
      </div>
    </div>
  );
}
