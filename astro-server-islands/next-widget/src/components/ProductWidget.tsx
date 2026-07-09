import type { Product } from '@/lib/products';

interface ProductWidgetProps {
  products: Product[];
  renderedAt: string;
}

export function ProductWidget({ products, renderedAt }: ProductWidgetProps) {
  return (
    <div className="next-widget-root">
      <style>{`
        .next-widget-root {
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1rem;
          background: #faf5ff;
          border: 1px solid #d8b4fe;
        }
        .next-widget-root h2 {
          margin: 0 0 0.75rem;
          font-size: 1.25rem;
          color: #581c87;
          font-family: system-ui, sans-serif;
        }
        .next-widget-root ul {
          margin: 0 0 0.75rem;
          padding: 0;
          list-style: none;
          font-family: system-ui, sans-serif;
        }
        .next-widget-root li {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e9d5ff;
          color: #6b21a8;
          font-size: 0.875rem;
        }
        .next-widget-root li:last-child {
          border-bottom: none;
        }
        .next-widget-root .price {
          font-weight: 600;
          color: #7e22ce;
        }
        .next-widget-root .meta {
          margin: 0;
          font-size: 0.875rem;
          color: #9333ea;
          font-family: system-ui, sans-serif;
        }
        .next-widget-root .badge {
          display: inline-block;
          margin-bottom: 0.75rem;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          background: #f3e8ff;
          color: #7e22ce;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: system-ui, sans-serif;
        }
      `}</style>
      <span className="badge">Next.js SSR</span>
      <h2>Recommended Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span className="price">${product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="meta">
        Rendered by Next.js at <time dateTime={renderedAt}>{renderedAt}</time>
      </p>
    </div>
  );
}
