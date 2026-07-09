import { ReviewsFragment } from '@/components/ReviewsFragment';
import { delay } from '@/lib/delay';

export const dynamic = 'force-dynamic';

const reviews = [
  { author: 'Jamie', rating: 5, text: 'Fast delivery and great quality.' },
  { author: 'Alex', rating: 4, text: 'Works well, easy to set up.' },
  { author: 'Sam', rating: 5, text: 'Exactly what I needed.' },
];

export default async function FragmentPage() {
  await delay(1400);

  const renderedAt = new Date().toISOString();

  return <ReviewsFragment reviews={reviews} renderedAt={renderedAt} />;
}
