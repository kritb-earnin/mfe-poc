import {
  ERROR_TYPE,
  lazyLoadComponentPlugin,
} from '@module-federation/modern-js-v3/react';
import { getInstance } from '@module-federation/modern-js-v3/runtime';
import type { JSX } from 'react';
import './index.css';

const instance = getInstance();
if (!instance) {
  throw new Error('Module Federation runtime instance is unavailable.');
}
instance.registerPlugins([lazyLoadComponentPlugin()]);

function RemoteFallback({
  label,
  error,
  errorType,
}: {
  label: string;
  error?: Error;
  errorType?: (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];
}) {
  if (errorType === ERROR_TYPE.LOAD_REMOTE) {
    return (
      <div className="fragment-error" role="alert">
        <strong>{label}</strong>
        <p>Remote module failed to load. Is the widget dev server running?</p>
      </div>
    );
  }
  if (errorType === ERROR_TYPE.DATA_FETCH) {
    return (
      <div className="fragment-error" role="alert">
        <strong>{label}</strong>
        <p>Remote data fetch failed.</p>
      </div>
    );
  }
  return (
    <div className="fragment-error" role="alert">
      <strong>{label}</strong>
      <p>{error?.message ?? 'Unknown error loading remote'}</p>
    </div>
  );
}

function RemoteLoading({ label }: { label: string }) {
  return <output className="fragment-loading">Loading {label}...</output>;
}

const PromoBanner = instance.createLazyComponent({
  loader: () => import('promo/PromoBanner'),
  export: 'default',
  loading: <RemoteLoading label="promo widget" />,
  fallback: ({ error, errorType }) => (
    <RemoteFallback label="Promo widget" error={error} errorType={errorType} />
  ),
});

const ProductCard = instance.createLazyComponent({
  loader: () => import('product/ProductCard'),
  export: 'default',
  loading: <RemoteLoading label="product widget" />,
  fallback: ({ error, errorType }) => (
    <RemoteFallback
      label="Product widget"
      error={error}
      errorType={errorType}
    />
  ),
});

const Index = (): JSX.Element => {
  return (
    <div className="page">
      <header className="header">
        <span className="badge">host · :3020</span>
        <h1 className="title">Modern.js Module Federation SSR</h1>
        <p>
          One page, three independent apps. The host server-renders federated
          React components loaded at runtime via <code>mf-manifest.json</code> —
          not HTML fetch, not route-level zones.
        </p>
        <p className="meta">Host shell rendered on the server.</p>
      </header>

      <section className="fragments" aria-label="Federated micro-frontends">
        <PromoBanner />
        <ProductCard />
      </section>
    </div>
  );
};

export default Index;
