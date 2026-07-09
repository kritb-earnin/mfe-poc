import type { ProductData } from './ProductCard.data';
import styles from './ProductCard.module.css';

const PRODUCTS = [
  { name: 'Trail Running Shoes', price: 129.99 },
  { name: 'Insulated Water Bottle', price: 34.5 },
  { name: 'Daypack 24L', price: 89.0 },
] as const;

interface ProductCardProps {
  mfData?: ProductData;
}

export default function ProductCard(_props: ProductCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>product-widget · :3022</span>
      <h2 className={styles.title}>Recommended Products</h2>
      <ul className={styles.list}>
        {PRODUCTS.map((product) => (
          <li key={product.name}>
            <span>{product.name}</span>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className={styles.meta}>
        Product list is static; SSR data fetch runs on the remote via
        ProductCard.data.ts.
      </p>
    </div>
  );
}
