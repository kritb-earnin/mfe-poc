import { ProductWidget } from '@/components/ProductWidget';
import { delay } from '@/lib/delay';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function WidgetPage() {
  await delay(1200);

  const products = await getProducts();
  const renderedAt = new Date().toISOString();

  return <ProductWidget products={products} renderedAt={renderedAt} />;
}
