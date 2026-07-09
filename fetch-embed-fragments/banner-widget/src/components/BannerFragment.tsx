interface BannerFragmentProps {
  renderedAt: string;
}

export function BannerFragment({ renderedAt }: BannerFragmentProps) {
  return (
    <div id="fragment-root" className="banner-fragment">
      <style>{`
        .banner-fragment {
          border-radius: 8px;
          padding: 1.25rem;
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: #eff6ff;
          font-family: system-ui, sans-serif;
        }
        .banner-fragment .badge {
          display: inline-block;
          margin-bottom: 0.5rem;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
          font-size: 0.75rem;
          font-weight: 600;
        }
        .banner-fragment h2 {
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
        }
        .banner-fragment p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.9;
        }
      `}</style>
      <span className="badge">banner-widget · :3011</span>
      <h2>Summer Sale — 30% Off</h2>
      <p>
        SSR fragment from an independent app. Rendered at{' '}
        <time dateTime={renderedAt}>{renderedAt}</time>
      </p>
    </div>
  );
}
