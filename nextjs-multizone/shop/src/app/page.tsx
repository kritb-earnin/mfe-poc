import Link from 'next/link';
import styles from './page.module.css';

const products = [
  { id: '1', name: 'Trail Running Shoes', price: 129.99 },
  { id: '2', name: 'Insulated Water Bottle', price: 34.5 },
  { id: '3', name: 'Daypack 24L', price: 89.0 },
];

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <span className={styles.badge}>Shop zone · port 3001 · basePath /shop</span>
      <h1 className={styles.title}>Shop</h1>
      <p>
        This page is served by a <strong>separate</strong> Next.js app with{' '}
        <code>basePath: &apos;/shop&apos;</code>. The home zone proxies{' '}
        <code>/shop/*</code> requests here via rewrites.
      </p>

      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
            <span>${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p>
        <a href="/">← Back to home zone</a>
      </p>
    </div>
  );
}
