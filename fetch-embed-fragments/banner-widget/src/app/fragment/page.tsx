import { BannerFragment } from '@/components/BannerFragment';
import { delay } from '@/lib/delay';

export const dynamic = 'force-dynamic';

export default async function FragmentPage() {
  await delay(600);

  const renderedAt = new Date().toISOString();

  return <BannerFragment renderedAt={renderedAt} />;
}
