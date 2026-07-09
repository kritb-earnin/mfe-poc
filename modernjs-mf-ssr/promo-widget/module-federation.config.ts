import { createModuleFederationConfig } from '@module-federation/modern-js-v3';

export default createModuleFederationConfig({
  name: 'promo',
  filename: 'remoteEntry.js',
  exposes: {
    './PromoBanner': './src/components/PromoBanner.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
