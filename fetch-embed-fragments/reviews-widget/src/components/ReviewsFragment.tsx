interface Review {
  author: string;
  rating: number;
  text: string;
}

interface ReviewsFragmentProps {
  reviews: Review[];
  renderedAt: string;
}

export function ReviewsFragment({ reviews, renderedAt }: ReviewsFragmentProps) {
  return (
    <div id="fragment-root" className="reviews-fragment">
      <style>{`
        .reviews-fragment {
          border-radius: 8px;
          padding: 1.25rem;
          background: #fff7ed;
          border: 1px solid #fdba74;
          font-family: system-ui, sans-serif;
        }
        .reviews-fragment .badge {
          display: inline-block;
          margin-bottom: 0.75rem;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          background: #ffedd5;
          color: #c2410c;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .reviews-fragment h2 {
          margin: 0 0 0.75rem;
          font-size: 1.125rem;
          color: #9a3412;
        }
        .reviews-fragment ul {
          margin: 0 0 0.75rem;
          padding: 0;
          list-style: none;
        }
        .reviews-fragment li {
          padding: 0.625rem 0;
          border-bottom: 1px solid #fed7aa;
          font-size: 0.875rem;
          color: #7c2d12;
        }
        .reviews-fragment li:last-child {
          border-bottom: none;
        }
        .reviews-fragment .meta {
          margin: 0;
          font-size: 0.8125rem;
          color: #ea580c;
        }
        .reviews-fragment .stars {
          color: #f97316;
          margin-right: 0.375rem;
        }
      `}</style>
      <span className="badge">reviews-widget · :3012</span>
      <h2>Customer Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.author}>
            <span className="stars">{'★'.repeat(review.rating)}</span>
            <strong>{review.author}:</strong> {review.text}
          </li>
        ))}
      </ul>
      <p className="meta">
        SSR fragment rendered at <time dateTime={renderedAt}>{renderedAt}</time>
      </p>
    </div>
  );
}
